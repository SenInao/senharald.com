import express, {Request, Response} from 'express';
import userApiRoutes from "./routes/user/route"
import dbConnect from './config/db';
import dotenv from "dotenv";
import configureSessions from './config/session';
import cors from "cors";

//enable environment
dotenv.config();

//configure express
const app = express();

declare module 'express-serve-static-core' {
  interface Request {
    session: any;
  }
};

//JSON and URL-encoded parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

//express-session
configureSessions(app);

//connecting to database
dbConnect();

app.use('/api/user', userApiRoutes);

export default app;
