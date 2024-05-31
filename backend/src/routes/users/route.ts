import express from "express";
import {registerCtrl, loginCtrl} from "../../controllers/users/controller";

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

//Login
userApiRoutes.post("/login", loginCtrl);

export default userApiRoutes;
