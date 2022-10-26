// TODO
// can delete this file
import express from "express";


import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost } from "./controllers/posts.js";
import { getGroup, createGroup, addMember, removeGroup, updateGroup } from "./controllers/groups.js";
import { signin, signup, joinGroup, removeUser } from "./controllers/users.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getAllPosts);
router.post('/discuss/create', createPost);
router.get('/discuss/post/:id', getPostById);
router.get('/discuss/tags', getPostsByTags);
router.patch('/discuss/like/:id', likePost);
router.patch('/discuss/update/:id', updatePost);
router.delete('/discuss/post/:id', deletePost);

//Group
router.get('/group/:id', getGroup);
router.post('/group/create', createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup);
router.delete('/group/:id', removeGroup); 
router.patch('/group/update/:id', updateGroup);



//User
router.post("/signin", signin);
router.post("/signup", signup);
router.delete('/user/:id', removeUser);

export default router;
