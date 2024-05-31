import express from 'express';
import userApiRoutes from "./routes/users/route"
import dbConnect from './config/db';

const app = express();

//connecting to database
dbConnect();

//JSON and URL-encoded parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', userApiRoutes);

export default app;
