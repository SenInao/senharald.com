import express from 'express';
import userApiRoutes from "./routes/user/route"
import dbConnect from './config/db';
import dotenv from "dotenv";
import configureSessions from './config/session';
import cors from "cors";
import chatApiRoutes from './routes/chat/route';

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
  origin: ['http://chat.senharald.com', "http://games.senharald.com", "http://localhost:3000", "http://localhost:3001"],
  credentials: true
};

app.use(cors(corsOptions));

//express-session
configureSessions(app);

//connecting to database
dbConnect();

// /api/user routes
app.use('/api/user', userApiRoutes);

// /api/chat routes
app.use('/api/chat', chatApiRoutes);

export default app;
