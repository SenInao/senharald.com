import express from "express";
import authenticate from "../../middlewares/authenticate";
import { acceptFriendRequestCtrl, addFriendToChatCtrl, createChatCtrl, createFriendRequest, declineFriendRequest, removeFriendCtrl } from "../../controllers/chat/controller";

const chatApiRoutes = express.Router()

//Send friend request
chatApiRoutes.post("/send-friend-request", authenticate, createFriendRequest);

//Accept friend request
chatApiRoutes.post("/accept-friend-request", authenticate, acceptFriendRequestCtrl);

//Decline friend request
chatApiRoutes.post("/decline-friend-request", authenticate, declineFriendRequest);

//Remove friend
chatApiRoutes.post("/remove-friend", authenticate, removeFriendCtrl);

//Create group chat
chatApiRoutes.post("/create-chat", authenticate, createChatCtrl);

//Add user to chat
chatApiRoutes.post("/add-friend-to-chat", authenticate, addFriendToChatCtrl);

export default chatApiRoutes
