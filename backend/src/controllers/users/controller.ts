import { Request, Response} from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";

const registerCtrl = async (req: Request, res: Response) => {
	const {fullname, username, email, password} = req.body;

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
		return;
	};
};

export default registerCtrl;
