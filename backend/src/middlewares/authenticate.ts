import { Response, Request, NextFunction } from "express";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.userAuth) {
		next();
	} else {
		res.status(200).send("access denied");
	};
};
