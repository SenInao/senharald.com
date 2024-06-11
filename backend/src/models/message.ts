import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required:true,
      ref:"User"
    },
    content: {
      type:String,
      required:true
    }
  }
)

const Message = mongoose.model("Message", messageSchema)

export default Message
