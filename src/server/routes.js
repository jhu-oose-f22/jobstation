import express from "express";

import { getPosts, createPost, getPost, getPostsByTags, likePost } from "./controllers/posts.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getPosts);
router.post('/discuss/create', createPost);
router.get('/discuss/post/:id', getPost);
router.patch('/discuss/like/:id', likePost)
export default router;