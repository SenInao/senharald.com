import { Request, Response} from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import "../../models/message"
import "../../models/chat"
import Chat from "../../models/chat";

export const registerCtrl = async (req: Request, res: Response) => {
	const {fullname, username, email, password} = req.body;

	if (req.session.userAuth) {
		res.status(200).json({status: false, message:"Already logged in"});
		return;
	};

	if (!fullname || !username || !email || !password) {
		res.status(200).json({status: false, message:"Please provide all fields"});
		return;
	};

	try {
		const emailTaken = await User.findOne({email});
		const usernameTaken = await User.findOne({username});

		if (emailTaken) {
		  res.status(200).json({status: false, message:"Email in use"});
			return;
		} else if (usernameTaken) {
      res.status(200).json({status: false, message:"Username in use"})
      return;
    };

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await User.create({
			fullname,
			username,
			email,
			password: hash,
		});

		user.save({validateBeforeSave: false});

		req.session.userAuth = user.id;

    const jsonUser = {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilePicture:user.profilePicture,
    };

		res.status(200).json({status: true, user:jsonUser});
		return;
	} catch (error) {
		console.log(error);
		res.status(400).send("Server error");
		return;
	};
};

export const loginCtrl = async (req: Request, res: Response) => {
	const {username, password} = req.body;

	if (req.session.userAuth) {
		res.status(200).send({status: false, message: "Already logged in"});
		return;
	};

	if (!username || !password) {
		res.status(200).send({status: false, message: "Please provide all fields"});
		return;
	};

	try {
		const userFound = await User.findOne({username});

		if (!userFound) {
		  res.status(200).send({status: false, message: "Wrong username or password"});
			return;
		};

		const correctPassword = await bcrypt.compare(password, userFound.password);

		if (!correctPassword) {
		  res.status(200).send({status: false, message: "Wrong username or password"});
			return;
		};

		req.session.userAuth = userFound.id;

    const jsonUser = {
      fullname: userFound.fullname,
      username: userFound.username,
      email: userFound.email,
      profilePicture:userFound.profilePicture,
    };

		res.status(200).json({status: true, user:jsonUser});
		return;
	} catch (error) {
		console.log(error);
		res.status(400).send("server error");
		return;
	};
};

export const logoutCtrl = async (req: Request, res: Response) => {
	req.session.userAuth = null;
	res.status(200).json({status:true});
	return;
};

export const userProfileCtrl = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.session.userAuth)
      .populate({
        path: "friends",
        select: "-password"
      })
      .populate({
        path: "chats",
        populate: {
          path: "messages"
        }
      }).lean()

		if (!user) {
		  res.status(200).json({status: false, message:"User not found"});
			return;
		};

    const jsonUser = {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilePicture:user.profilePicture,
      chats: user.chats,
      friends: user.friends
    };

		res.status(200).json({status: true, user:jsonUser});
		return;

	} catch (error) {
		console.log(error);
		res.status(400).send("server error");
		return;
	};
};

export const updateProfileCtrl = async (req: Request, res: Response) => {
	const {username, fullname, email} = req.body;

	if (!username || !fullname || !email) {
		res.status(200).json({status:false, message:"Please provide all fields"});
		return;
	};

	try {

    const user = await User.findById(req.session.userAuth);

    if (!user) {
      res.status(200).json({status:false, message:"User not found"});
      return;
    };

		const emailTaken = await User.findOne({email});
		const usernameTaken = await User.findOne({username});

		if (emailTaken && user.email != email) {
      res.status(200).json({status:false, message:"Email taken"})
			return;
		} else if (usernameTaken && user.username != username) {
      res.status(200).json({status:false, message:"Username taken"})
			return;
		};

		await user.updateOne(
			{
				fullname,
				username,
				email
			}, {new:true}
		);

    const jsonData = {
      fullname:fullname,
      username:username,
      email:email,
      profilePicture:user.profilePicture,
    };
		
		res.status(200).json({status:true, user:jsonData});
		
	} catch (error) {
		console.log(error);
		res.status(400).send("server error");
		return;
	};
};

export const profileImageUploadCtrl = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.session.userAuth);

    if (!user) {
      res.status(200).json({status:false, message: "User not found"});
      return;
    };

    if (req.file) {
      await user.updateOne({
        profilePicture: req.file.path
      }, {new:true});

      res.status(200).json({status:true, path: req.file.path});
    };
  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
    return;
  };
};

export const addFriendCtrl = async (req: Request, res: Response) => {
  const {username} = req.body

  if (!username) {
    res.status(200).json({status:false, message:"Please provide a username"})
  }
  try {
    const user = await User.findById(req.session.userAuth)
    const friend = await User.findOne({username})

    if (!user) {
      res.status(200).json({status:false, message:"User not found"});
      return;
    }
    
    if (!friend) {
      res.status(200).json({status:false, message:"No user with requested username"})
      return;
    }

    if (user.username == username) {
      res.status(200).json({status:false, message:"Cannot add yourself as a friend ;)"})
      return;
    }

    for (let i = 0; i < user.friends.length; i++) {
      if (friend.id == user.friends[i]) {
        res.status(200).json({status:false, message:"Already friends with this user"})
        return;
      }
    }

    const friends = user.friends

    const updatedFriends = [...friends, friend.id]

    await user.updateOne(
      {
        friends: updatedFriends
      },
      {new:true}
    )

    const chat = await Chat.create({
      title: friend.username + " " + user.username,
      users: [user.id, friend.id],
      messages: [],
    })

    chat.save({validateBeforeSave:false})

    const userChats = [...user.chats, chat]
    const friendChats = [...friend.chats, chat]

    await user.updateOne({chats: userChats})
    await friend.updateOne({chats: friendChats})

    res.status(200).json({status:true})
    return;
  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
    return;
  };
};


export const removeFriendCtrl = async (req:Request, res:Response) => {
  const {username} = req.body

  if (!username) {
    res.status(200).json({status:false, message:"Please provide a username"})
  }

  try {
    const user = await User.findById(req.session.userAuth)

    if(!user) {
      res.status(200).json({status:false, message:"User not found"})
      return
    }

    for (let i = 0; i < user.friends.length; i++) {
      const friend = await User.findById(user.friends[i])

      if (!friend) {
        res.status(200).json({status:false, message:"No user with requested username"})
        return
      }

      if (friend.username == username) {
        const friends = user.friends

        friends.splice(i, 1)

        await user.updateOne({
          friends: friends
        })

        res.status(200).json({status:true})
        return
      }
    }
    
    res.status(200).json({status:false, message:"Friend not found"})
    return

  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
    return;
  }
}
