import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullname: {
			type:String,
			required: true,
		},
		username: {
			type:String,
			required: true,
		},
		email: {
			type:String,
			required:true,
		},
		password: {
			type:String,
			required:true,
		},
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref:"User",
			}
		],
		chats: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref:"Chat",
			}
		],
	}
);

const User = mongoose.model("User", userSchema);

export default User;
