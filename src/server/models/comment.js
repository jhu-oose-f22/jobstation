import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    // ID: Number,
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: {
        type: String,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});


const Post = mongoose.model('Post', postSchema);

export default Post;