import express from "express";
import {registerCtrl, loginCtrl, logoutCtrl} from "../../controllers/user/controller";
import authenticate from "../../middlewares/authenticate";

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

//Login
userApiRoutes.post("/login", loginCtrl);

//Logout
userApiRoutes.post("/logout", authenticate, logoutCtrl);

export default userApiRoutes;
