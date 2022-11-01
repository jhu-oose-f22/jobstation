// TODO
// can delete this file
import express from "express";


import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost } from "./controllers/posts.js";
import {  quitGroup, getGroupByUser, getGroups, createGroup, addMember, getGroupsByInput, updateGroup } from "./controllers/groups.js";
import { getAllUser, signin, signup, joinGroup, removeUser, updateUser, getUser, getUserByUsername } from "./controllers/users.js";

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
router.post('/group/create', createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup); // unused 
router.patch('/group/update/:id', updateGroup);
router.get('/group', getGroups);
router.get('/group/search/:input', getGroupsByInput);
router.get('/group/:username', getGroupByUser);
router.post('/group/quit', quitGroup)




//User
router.post('/signin', signin);
router.post('/signup', signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);


// router.get('/user/:id', getUser);


router.get('/user/:username', getUserByUsername);




router.get('/user', getAllUser);



export default router;
