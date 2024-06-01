import express from "express";
import {registerCtrl, loginCtrl, logoutCtrl, userProfileCtrl} from "../../controllers/user/controller";
import authenticate from "../../middlewares/authenticate";

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

//Login
userApiRoutes.post("/login", loginCtrl);

//Logout
userApiRoutes.post("/logout", authenticate, logoutCtrl);

//Profile Info
userApiRoutes.get("/", authenticate, userProfileCtrl);

export default userApiRoutes;
