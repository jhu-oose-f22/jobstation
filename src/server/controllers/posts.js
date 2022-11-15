import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { getRelatedContentsTitle, appId, recommendApi } from "../middleware/recommend.js";
import Group from "../models/group.js";


export const getAllPosts = async (req, res) => {
    try {
        let targetPost = await Post.find();//getPosts 拿到creator查到username 加进去
        // console.log('I am here 0')
        // console.log(targetPost)
        for (let post in targetPost) {
            //const targetUser = await User.findById(userId);
            // console.log(post)
            let targetCreator = targetPost[post].creator;
            // console.log(targetCreator[post])
            // const {userId, newUsername, email, tags} = 
            let targetUserName = await User.findById(targetCreator);
            // let targetUserName = await User.findById(targetCreator);
            // console.log(targetUserName)
            var target = targetPost[post]
            var source = { creatorName: targetUserName.username }
            console.log(target)
            console.log(source)
            // targetPost[post] = Object.assign(target, source);
            targetPost[post] = Object.assign(target, { likeCount: 3 });
            targetPost[post] = Object.assign(target, source);
            console.log(targetPost[post].creatorName)
            // console.log(target, target == result);
            // var target = { name: 'guxin', age: 18 }
            // var source = { state: 'signle', age: 22 }
            // var result = Object.assign(target, source)
            // console.log(target)
            // var source = { creatorName: targetUserName.username }
            // console.log(source)
            // var result=Object.assign(targetPost[post],source)
            // console.log(targetPost[post]);
            // const result = Object.assign(targetPost[post], source);
            // console.log(targetPost[post],targetPost[post]==result);
            // const updatedInfo = {
            //     creatorName: targetUserName,
            // }
            // console.log('I am here 1')
            // targetPost[post].push(updatedInfo)
            
            // console.log(result)
            // const tagName = { Name: tag };
            // const findedTags = await this.find({ Name: tag });
            // if (!findedTags.length) newTags.push(tagName);
        }
        res.status(200).json(targetPost[0].creatorName + targetPost[1].creatorName);
        res.status(200).json(targetPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    try {
        const input = req.params.input;

        const targetPosts = await Post.find({
            $or: [
                {
                    title: { $regex: input, $options: "i" },
                },
                {
                    tags: { $regex: input, $options: "i" },
                },
            ],
        });
        console.log(targetPosts);
        res.status(200).json(targetPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getRecommendedPosts = async (req, res) => {
    try {
        const ContentsType = "post";
        const RelatedContentsNames = await getRelatedContentsTitle(req.params.userName, ContentsType);
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        await delay(200);

        const recommendedPosts = await Post.find({ title: { "$in": RelatedContentsNames } });
        res.status(200).json(recommendedPosts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, creator, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(creator)) return res.status(404).send(`No user with id: ${creator}`);
    const newPost = await Post.createPost({ title, message, creator, tags });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(204).json({ message: error.message });
    }
}

export const getPostsByUserId = async (req, res) => {
    try {
        
        const targetPosts = await Post.find({
            creator: req.params.userId
        });
        if (targetPosts.length === 0) 
            console.log(`user ${req.params.userId} has no post`); 
        res.status(201).json(targetPosts);
    } catch (error) {
        res.status(404).json([]);
    }
};

export const getPostsByTags = async (req, res) => {
    try {
        const { tags } = req.body;
        // console.log(tags);
        const targetPosts = await Post.find({ tags: { $all: tags } });
        res.status(201).json(targetPosts);
        // console.log(targetPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getPostById = async (req, res) => {
    try {
        const targetPost = await Post.findById(req.params.id);
        res.status(200).json(targetPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, _id: id };
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatedPost);
}

export const dislikePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount - 1 }, { new: true });
    res.json(updatedPost);
}

//Comments functions
export const createComment = async (req, res) => {
    const { postId, userId, message } = req.body;
    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    console.log(message, userId);
    const newComment = await Comment.create({ message, userId });
    const post = await Post.findById(postId);
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            commentCount: post.commentCount + 1,
            $push: { comments: newComment._id },
        },
        { new: true }

    );
    res.json(updatedPost);
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId, postId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).send(`No comment with id: ${commentId}`);
        await Comment.findByIdAndRemove(commentId);
        //delet dubcomment
        await Post.updateMany({ $pull: { comments: commentId } })
        res.json({ message: "Comment deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const likeComment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Comment with id: ${id}`);
    const comment = await Comment.findById(id);
    const updatedComment = await Comment.findByIdAndUpdate(id, { likeCount: comment.likeCount + 1 }, { new: true });
    res.json(updatedComment);
}



export const getComment = async (req, res) => {
    try {
        const targetComment = await Comment.findById(req.params.id);
        res.status(200).json(targetComment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const post = await Post.findById(id);
        const comments = await Comment.find({ $all: { _id: post.comments } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
