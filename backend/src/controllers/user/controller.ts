import { Request, Response} from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import { uploadImage } from "../../utils/cloudinary";

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
		const user = await User.findById(req.session.userAuth);

		if (!user) {
		  res.status(200).json({status: false, message:"User not found"});
			return;
		};

    const jsonUser = {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
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
