import mongoose, {mongo} from "mongoose";

const postSchema = mongoose.Schema({
    // ID: Number,
    title: String,
    message: String,
    creator: {
        type: mongoose.ObjectId
    },
    creatorName: String,
    comments: [String],
    tags: [String],
    likedPeople : {
        type: [mongoose.ObjectId],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
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
        return await this.find({}).skip(offset);
      }
    
    static async createPost({title, message, creator, tags}){
        if(title && message && creator && tags){
            return await this.create({
                title,
                message,
                creator,
                tags,
            });
        }
        else{
            console.error('Missing component of a post');
        }
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
