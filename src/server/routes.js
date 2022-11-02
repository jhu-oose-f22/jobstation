// TODO
// can delete this file
import express from "express";


import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost } from "./controllers/posts.js";
import {  quitGroup, getGroupByUser, joinGroup, getGroups, createGroup, addMember, getGroupsByInput, updateGroup } from "./controllers/groups.js";
import { getAllUser, signin, signup, removeUser, updateUser, getUser, getUserByUsername } from "./controllers/users.js";
import { createTags, getTags } from "./controllers/tags.js";
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
router.post('/group/create', createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup); // unused 
router.patch('/group/update/:id', updateGroup);
router.get('/group', getGroups);
router.get('/group/search/:input', getGroupsByInput);
router.get('/group/:username', getGroupByUser);
router.post('/group/quit', quitGroup)
router.post('/group/join', joinGroup)



//User
router.post('/signin', signin);
router.post('/signup', signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);
router.get('/user/:username', getUserByUsername);
router.get('/user', getAllUser);

//Tags
router.get('/tags', getTags);
// router.delete('/tag/:id', removeTag);

export default router;
