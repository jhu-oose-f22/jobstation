import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: new Date()
    },
});

class PostClass {
    static async list({ offset = 0 } = {}) {
        const posts = await this.find({}).sort({ createdAt }).skip(offset);
        return posts;
      }
    
    static async listByTag({ tag } = {}) {
        const tagPosts = await this.find({ tag }).sort({ createdAt }).skip(offset).limit(limit);
        if (!tagPosts) {
            throw new Error('The tag is not valid');
        }

        return tagPosts;
    }

}

postSchema.loadClass(PostClass);

const Post = mongoose.model('Post', postSchema);

export default Post;