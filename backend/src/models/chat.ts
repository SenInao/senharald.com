import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"User"
      }
    ],
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"Message"
      }
    ]
  }
)

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
