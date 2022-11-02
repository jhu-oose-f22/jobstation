import Post from "../models/post.js";
import mongoose from "mongoose";
import { getRelatedContentsTitle, appId, recommendApi } from "../middleware/recommend.js";

export const getAllPosts = async (req, res) => {
    try {
        const targetPost = await Post.list();
        res.status(200).json(targetPost);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getRecommendedPosts = async (req, res) => {
    try {
        const ContentsType = "post"; 
        const RelatedContentsNames = getRelatedContentsTitle(req.params.userName, ContentsType);  //

        console.log(RelatedContentsNames);
        const recommendedPosts = Post.find( { title: { "$in": RelatedContentsNames } } );
        res.status(200).json(recommendedPosts);
        console.log(recommendedPosts);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createPost = async (req, res) => {
    const {title, message, creator, tags} = req.body;
    const newPost = await Post.createPost({title, message, creator, tags});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(204).json({ message: error.message});
    }
}

export const getPostsByTags = async (req, res) => {
    try {
        const {tags} = req.body;
        console.log(tags);
        const targetPosts = await Post.find( { tags: {$all: tags}});
        res.status(201).json(targetPosts);
        console.log(targetPosts);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }

}

export const getPostById = async (req, res) => {
    try {
        const targetPost = await Post.findById(req.params.id);
        res.status(200).json(targetPost);
    } catch (error) {
        res.status(404).json({ message: error.message});
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
