import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: { 
		type: String, 
		required:  true 
	},
	email: { 
		type: String, 
		required: true 
	},
	password: { 
		type: String, 
		required: true 
	},
	avatar: String,
	groups: {
		type: [mongoose.ObjectId],
		default: []
	},
	tags: [String],
	posts: [String],
	createdAt: {
		type: Date,
		default: new Date()
	},
});

export default mongoose.model("User", userSchema);
