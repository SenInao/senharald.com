import { Request, Response} from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";

export const registerCtrl = async (req: Request, res: Response) => {
	const {fullname, username, email, password} = req.body;

	if (req.session.userAuth) {
		res.status(400).send("already logged in");
		return;
	};

	if (!fullname || !username || !email || !password) {
		res.status(400).send("Please provide all required information");
		return;
	};

	try {
		const emailTaken = await User.findOne({email});
		const usernameTaken = await User.findOne({username});

		if (emailTaken || usernameTaken) {
			res.status(400).send("email or username in use");
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

		res.status(200).send("Success");
		return;
	} catch (error) {
		console.log(error);
		res.status(400).send("server error");
		return;
	};
};

export const loginCtrl = async (req: Request, res: Response) => {
	const {username, password} = req.body;

	if (req.session.userAuth) {
		res.status(400).send("already logged in");
		return;
	};

	if (!username || !password) {
		res.status(400).send("Please provide all information");
		return;
	};

	try {
		const userFound = await User.findOne({username});

		if (!userFound) {
			res.status(400).send("Wrong username");
			return;
		};

		const correctPassword = await bcrypt.compare(password, userFound.password);

		if (!correctPassword) {
			res.status(400).send("Wrong password");
			return;
		};

		req.session.userAuth = userFound.id;

		res.status(200).send("Success");
		return;
	} catch (error) {
		console.log(error);
		res.status(400).send("server error");
	};
};

export const logoutCtrl = async (req: Request, res: Response) => {
	if (!req.session.userAuth) {
		res.status(400).send("not logged in");
		return;
	};

	req.session.userAuth = null;
	res.status(200).send("logged out");
};
