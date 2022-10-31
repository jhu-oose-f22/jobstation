// TODO
// can delete this file
import express from "express";


import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost } from "./controllers/posts.js";

import { getGroup, createGroup, addMember, removeGroup, updateGroup, getGroups } from "./controllers/groups.js";
import { signin, signup, joinGroup, removeUser, updateUser, getUser } from "./controllers/users.js";
import { createTags, getTags, remove } from "./controllers/tags.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getAllPosts);
router.post('/discuss/create', createTags, createPost);
router.get('/discuss/post/:id', getPostById);
router.get('/discuss/tags', getPostsByTags);
router.patch('/discuss/like/:id', likePost);
router.patch('/discuss/update/:id', createTags, updatePost);
router.delete('/discuss/post/:id', deletePost);

//Group
router.get('/group/:id', getGroup);
router.post('/group/create', createTags, createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup);  // unused 
router.delete('/group/:id', removeGroup); 
router.patch('/group/update/:id', createTags, updateGroup);
router.get('/group', getGroups);

//User
router.post('/signin', signin);
router.post('/signup', signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);
router.get('/user/:id', getUser);

//Tags
router.get('/tags', getTags);
router.delete('/tag/:id', removeTag);

export default router;
