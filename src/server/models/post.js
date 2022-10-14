import mongoose from "mongoose";

const postSchema = mongoose.Schema({
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
    
    static async createPost(info){
        newPost = await this.create(info)
        //specify user in session as creator when added user model 
    }

    static async listByTag({ tag } = {}) {
        const tagPosts = await this.find({ tag }).sort({ createdAt });
        if (!tagPosts) {
            throw new Error('The tag is not valid');
        }

        return tagPosts;
    }

}

postSchema.loadClass(PostClass);

const Post = mongoose.model('Post', postSchema);

export default Post;