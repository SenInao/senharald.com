import express from "express";
import {registerCtrl, loginCtrl, logoutCtrl, userProfileCtrl, updateProfileCtrl, profileImageUploadCtrl, removeFriendCtrl, createFriendRequest, acceptFriendRequestCtrl, declineFriendRequest} from "../../controllers/user/controller";
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

//Send friend request
userApiRoutes.post("/send-friend-request", authenticate, createFriendRequest);

//Accept friend request
userApiRoutes.post("/accept-friend-request", authenticate, acceptFriendRequestCtrl);

//Decline friend request
userApiRoutes.post("/decline-friend-request", authenticate, declineFriendRequest);

//Remove friend
userApiRoutes.post("/remove-friend", authenticate, removeFriendCtrl);

//Profile Info
userApiRoutes.get("/", authenticate, userProfileCtrl);

export default userApiRoutes;
