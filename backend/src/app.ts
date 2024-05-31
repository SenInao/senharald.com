import express from 'express';
import userApiRoutes from "./routes/user/route"
import dbConnect from './config/db';
import dotenv from "dotenv";
import configureSessions from './config/session';

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
configureSessions(app);

//connecting to database
dbConnect();

//JSON and URL-encoded parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user', userApiRoutes);

export default app;
