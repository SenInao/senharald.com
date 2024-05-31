import MongoStore from 'connect-mongo';
import session from 'express-session';
import dotenv from "dotenv";
import express from "express";

dotenv.config()

const configureSessions = (app:express.Application) => {
	const sessionKey = process.env.SESSION_KEY;
	const mongoUrl = process.env.MONGO_URL;

	if (!sessionKey || !mongoUrl) {
		throw new Error("mission session key")
	};
	app.use(
		session({
			secret:sessionKey,
			resave:false,
			saveUninitialized:true,
			store: MongoStore.create({
				mongoUrl:mongoUrl,
				ttl: 14 * 24 * 60 * 60,
			}),
		})
	);
};

export default configureSessions;
