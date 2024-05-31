import express, { Request, Response, NextFunction} from 'express';
import userApiRoutes from "./routes/users/route"
import dbConnect from './config/db';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from "dotenv";

//enable environment
dotenv.config();

//configure express
const app = express();

declare module 'express-serve-static-core' {
  interface Request {
    session: any;
  }
}

//express-session
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


//connecting to database
dbConnect();

//JSON and URL-encoded parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', userApiRoutes);

export default app;
