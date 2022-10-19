import Post from "../models/post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const targetPost = await Post.list();

        res.status(200).json(targetPost);
        console.log(targetPost);
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
    const tags = req.body.tags;
    
}

export const getPost = async (req, res) => {
    try {
        const targetPost = await Post.findById(req.params.id);
        res.status(200).json(targetPost);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatedPost);
}
