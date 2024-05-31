import express from "express";
import {registerCtrl, loginCtrl, logoutCtrl} from "../../controllers/users/controller";

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

//Login
userApiRoutes.post("/login", loginCtrl);

//Logout
userApiRoutes.post("/logout", logoutCtrl);

export default userApiRoutes;
