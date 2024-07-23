import {Request, Response} from "express"
import User from "../../models/user";
import Chat from "../../models/chat";

export const createFriendRequest = async (req: Request, res: Response) => {
  const {username} = req.body

  if (!username) {
    res.status(200).json({status:false, message:"Please provide a username"})
  }
  try {
    const user = await User.findById(req.session.userAuth)
    const friend = await User.findOne({username: username})

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
    if (user.friends.includes(friend.id)) {
      res.status(200).json({status:false, message:"Already friends with this user"})
      return
    }
    if (friend.friendRequests.includes(user.id)) {
      res.status(200).json({status:false, message:"Already sent friend request"})
      return
    }
    if (user.friendRequests.includes(friend.id)) {
      res.status(200).json({status:false, message:"Already received request from that user"})
      return
    }

    friend.friendRequests.push(user.id)
    await friend.save()

    res.status(200).json({status:true})
    return;
  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
    return;
  };
};

export const acceptFriendRequestCtrl = async (req:Request, res:Response) => {
  const {username} = req.body

  if (!username) {
    res.status(200).json({status:false, message:"Please provide a username"})
  }
  try {
    const user = await User.findById(req.session.userAuth)
    const friendToAccept = await User.findOne({username: username})
    if (!user) {
      res.status(200).json({status:false, message:"User not found"});
      return;
    }

    if (!friendToAccept) {
      res.status(200).json({status:false, message:"Friend not found"});
      return;
    }

    if (!user.friendRequests.includes(friendToAccept.id)) {
      res.status(200).json({status:false, message:"No friend request for that user"});
      return;
    }

    user.friendRequests.splice(user.friendRequests.indexOf(friendToAccept.id))

    user.friends.push(friendToAccept.id)
    friendToAccept.friends.push(user.id)

    const chat = await Chat.create({
      dm: true,
      title: "DM",
      users: [user.id, friendToAccept.id],
      messages: [],
    })

    await chat.save({validateBeforeSave:false})

    user.chats.push(chat.id)
    friendToAccept.chats.push(chat.id)

    user.save()
    friendToAccept.save()

    res.status(200).json({status:true})
    return;
  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
  }
}

export const declineFriendRequest = async (req:Request, res:Response) => {
  const {username }= req.body

  if (!username) {
    res.status(200).json({status:false, message:"Please provide a username"})
  }
  try {
    const user = await User.findById(req.session.userAuth)
    const friendToDecline = await User.findOne({username: username})

    
    if (!user) {
      res.status(200).json({status:false, message:"User not found"});
      return;
    }

    if (!friendToDecline) {
      res.status(200).json({status:false, message:"Friend not found"});
      return;
    }

    if (!user.friendRequests.includes(friendToDecline.id)) {
      res.status(200).json({status:false, message:"No friend request for that user"});
      return;
    }

    user.friendRequests.splice(user.friendRequests.indexOf(friendToDecline.id))

    user.save()

    res.status(200).json({status:true})
    return;
  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
  }
}

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

export const createChatCtrl = async (req: Request, res:Response) => {
  const {title} = req.body

  if (!title) {
      res.status(200).json({status:false, message:"Chat name missing"})
      return
  }

  try {
    const user = await User.findById(req.session.userAuth)
    if (!user) {
      res.status(200).json({status:false, message:"User not found"})
      return
    }

    const chat = await Chat.create({
      dm: false,
      title: title,
      users: [req.session.userAuth],
      messages: []
    })

    await chat.save({validateBeforeSave:false})
    user.chats.push(chat._id)
    await user.save({validateBeforeSave:false})

    res.status(200).json({status:true})
    return
  } catch (error) {
    res.status(200).json({status:false});
    console.log(error);
    return;
  }
}

export const addFriendToChatCtrl = async (req: Request, res: Response) => {
  const {chatId, friend} = req.body

  if (!chatId) {
    res.status(200).json({status:false, message: "chat id required"})
    return
  }

  if (!friend) {
    res.status(200).json({status:false, message: "friend to add is required"})
    return
  }

  try {
    const chat = await Chat.findById(chatId)
    const user = await User.findById(req.session.userAuth)
    const friendObj = await User.findOne(friend)

    if (!chat) {
      res.status(200).json({status:false, message: "chat not found"})
      return 
    }

    if (!user) {
      res.status(200).json({status: false, message: "user not found"})
      return 
    }

    if (!friendObj) {
      res.status(200).json({status: false, message: "friend not found"})
      return 
    }

    if (user.friends.indexOf(friendObj._id) === -1) {
      res.status(200).json({status: false, message: "not friends with this user"})
      return 
    }

    if (chat.dm) {
      res.status(200).json({status: false, message: "chat is a dm"})
      return
    }

    chat.users.push(friendObj._id)
    friendObj.chats.push(chat._id)

    await chat.save({validateBeforeSave:false})
    await friendObj.save({validateBeforeSave:false})

    res.status(200).json({status:true})
    return
  } catch (error) {
    res.status(200).json({status:false})
    console.log(error)
    return
  }
}
