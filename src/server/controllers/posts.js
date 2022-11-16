import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { getRelatedContentsTitle, createPostEvent, createLikeEvent, getRecommendedContentsTitle } from "../middleware/recommend.js";

export const getAllPosts = async (req, res) => {
    try {
        let targetPosts = await Post.find();

        for (let i in targetPosts) {
            let creator = await User.findById(targetPosts[i].creator);
            targetPosts[i].creatorName = creator.username;
        }

        res.status(200).json(targetPosts);
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

        for (let i in targetPosts) {
            let creator = await User.findById(targetPosts[i].creator);
            targetPosts[i].creatorName = creator.username;
        }

        console.log(targetPosts);
        res.status(200).json(targetPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getRecommendedPosts = async (req, res) => {
    try {
        const ContentsType = "post";
        var RelatedContentsIds = await getRelatedContentsTitle(req.params.id, ContentsType);

        var RecommendedContentIds = await getRecommendedContentsTitle(req.params.id);

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        await delay(300);
        console.log("RelatedContentsIds")
        console.log(RelatedContentsIds.length)

        const RecommendRst = RelatedContentsIds.concat(RecommendedContentIds);

        console.log(RecommendRst)
        const targetPosts = await Post.find({ _id: { "$in": RecommendRst } });
        console.log(targetPosts.length)

        // if( targetPosts.length < 20 ){

        // }

        for (let i in targetPosts) {
            let creator = await User.findById(targetPosts[i].creator);
            targetPosts[i].creatorName = creator.username;
        }

        res.status(200).json(targetPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, creator, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(creator)) return res.status(404).send(`No user with id: ${creator}`);
    try {
        const newPost = await Post.createPost({ title, message, creator, tags });
        console.log("postId: ", newPost.id),
        await createPostEvent(newPost.id, newPost.tags, newPost.creator);
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

        for (let i in targetPosts) {
            let creator = await User.findById(targetPosts[i].creator);
            targetPosts[i].creatorName = creator.username;
        }

        res.status(201).json(targetPosts);
    } catch (error) {
        res.status(404).json([]);
    }
};

export const getPostsByTags = async (req, res) => {
    try {
        const { tags } = req.body;

        const targetPosts = await Post.find({ tags: { $all: tags } });

        for (let i in targetPosts) {
            let creator = await User.findById(targetPosts[i].creator);
            targetPosts[i].creatorName = creator.username;
        }

        res.status(201).json(targetPosts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getPostById = async (req, res) => {
    try {
        const targetPost = await Post.findById(req.params.id);

        let creator = await User.findById(targetPost.creator);
        targetPost.creatorName = creator.username;

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
    const { id, userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);

    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    await createLikeEvent(id, userId);

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
    const newComment = await Comment.create({ message, creator: userId });
    const post = await Post.findById(postId);
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            commentCount: post.commentCount + 1,
            $push: { comments: newComment._id },
        },
        { new: true }

    );
    res.json(newComment);
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

        for (let i in comments){
            let creator = await User.findById(comments[i].creator);
            comments[i].creatorName = creator.username;
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
