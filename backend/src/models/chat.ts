import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    dm: Boolean,
    title: String,
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
