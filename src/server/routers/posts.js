import express from "express";
import {createPost, deletePost, getPostById, getAllPosts, likePost, updatePost} from "../controllers/posts.js";

const postRouter = express.Router();

//Discuss
postRouter.get('/discuss', getAllPosts);
postRouter.post('/discuss/create', createPost);
postRouter.get('/discuss/post/:id', getPostById);
postRouter.put('/discuss/like/:id', likePost);
postRouter.put('/discuss/update/:id', updatePost);
postRouter.delete('/discuss/post/:id', deletePost);

export default postRouter;
