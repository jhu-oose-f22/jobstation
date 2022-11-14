import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    message: String,
    creator: {
        type: mongoose.ObjectId
    },
    comments: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

class CommentClass {
    static async list({ offset = 0 } = {}) {
        return await this.find({}).skip(offset);
      }
}

commentSchema.loadClass(CommentClass);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;