import express from "express";
import registerCtrl from "../../controllers/users/controller";

const userApiRoutes = express.Router();

// Register
userApiRoutes.post("/register", registerCtrl);

export default userApiRoutes;
