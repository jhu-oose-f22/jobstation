import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    // ID: Number,
    title: String,
    message: String,
    creator: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

class PostClass {
    static async list({ offset = 0 } = {}) {
        const posts = await this.find({}).skip(offset);
        return posts;
      }
    
    static async createPost({title, message, creator, tags}){
        if(title && message && creator && tags){
            const newPost = await this.create({
                title,
                message,
                creator,
                tags,
            });
            return newPost;
        }
        else{
            throw new Error('Missing component of a post');
        }
        
        
        //specify user in session as creator when added user model 
    }

    static async getByID({ id } = {}){
        const targetPost = await this.find({ id });
        if (!targetPost) {
            throw new Error('The tag is not valid');
        }
        return targetPost;
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