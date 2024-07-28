import mongoose from "mongoose";
import { type } from "os";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Chat"
    },
    author: {
      type: mongoose.Schema.ObjectId,
      required:true,
      ref:"User"
    },
    content: {
      type:String,
      required:true
    },
    usersRead: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ]
  }, {timestamps:true}
)

const Message = mongoose.model("Message", messageSchema)

export default Message
