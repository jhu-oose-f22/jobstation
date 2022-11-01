// TODO
// can delete this file
import express from "express";


import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost } from "./controllers/posts.js";
import {  quitGroup, getGroup, getGroups, createGroup, addMember, removeGroup, updateGroup, getGroupsByIDs } from "./controllers/groups.js";
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
router.get('/group/:id', getGroup);
router.post('/group/create', createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup); // unused 
// router.delete('/group/:id', removeGroup); 
router.patch('/group/update/:id', updateGroup);
// router.get('/group', getGroupsByIDs);
router.get('/group', getGroups);
router.post('/group/quit', quitGroup)



//User
router.post('/signin', signin);
router.post('/signup', signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);


router.get('/user/:id', getUser);


router.get('/user/:username', getUserByUsername);




router.get('/user', getAllUser);



export default router;
