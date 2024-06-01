import express from "express";
import {registerCtrl, loginCtrl, logoutCtrl, userProfileCtrl, updateProfileCtrl} from "../../controllers/user/controller";
import authenticate from "../../middlewares/authenticate";

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

//Login
userApiRoutes.post("/login", loginCtrl);

//Logout
userApiRoutes.post("/logout", authenticate, logoutCtrl);

//Update Profile Info
userApiRoutes.post("/update", authenticate, updateProfileCtrl);

//Profile Info
userApiRoutes.get("/", authenticate, userProfileCtrl);

export default userApiRoutes;
