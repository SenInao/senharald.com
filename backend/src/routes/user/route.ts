import express from "express";
import {registerCtrl, loginCtrl, logoutCtrl, userProfileCtrl, updateProfileCtrl, profileImageUploadCtrl} from "../../controllers/user/controller";
import authenticate from "../../middlewares/authenticate";
import uploadMiddleware from "../../middlewares/uploadImage";
import { deletePrevious } from "../../middlewares/delProfilePic";

const upload = uploadMiddleware("profilePictures");

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

//Login
userApiRoutes.post("/login", loginCtrl);

//Logout
userApiRoutes.post("/logout", authenticate, logoutCtrl);

//Update Profile Info
userApiRoutes.post("/update", authenticate, updateProfileCtrl);

//Profile photo upload
userApiRoutes.post("/profile-photo-upload", authenticate, deletePrevious, upload.single("profile"), profileImageUploadCtrl);

//Profile Info
userApiRoutes.get("/", authenticate, userProfileCtrl);

export default userApiRoutes;
