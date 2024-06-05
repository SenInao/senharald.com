import dotenv from "dotenv";
import { v2 } from "cloudinary";

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default v2;
