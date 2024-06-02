import { Response, Request, NextFunction } from "express";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.userAuth) {
		next();
	} else {
		res.status(200).json({status: false, message:"Not logged in"});
	};
};

export default authenticate;
