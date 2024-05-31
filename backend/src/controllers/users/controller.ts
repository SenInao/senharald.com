import { Request, Response} from "express";
import User from "../../models/user";

const registerCtrl = async (req: Request, res: Response) => {
	const {fullname, username, email, password} = req.body;

	if (!fullname || !username || !email || !password) {
		res.status(400).send("Please provide all required information");
		return;
	};

	try {
		console.log(fullname, username, email, password);
		const emailTaken = await User.findOne({email});
		const usernameTaken = await User.findOne({username});

		if (emailTaken || usernameTaken) {
			res.status(400).send("email or username in use");
			return;
		};

		res.status(200).send("OK");
		return;
	} catch (error) {
		console.log(error);
		return;
	};
};

export default registerCtrl;
