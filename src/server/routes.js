// TODO
// can delete this file
import express from "express";

import { getAllPosts, getPostsByUsername, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost, getRecommendedPosts } from "./controllers/posts.js";

import { quitGroup, getGroupByUser, joinGroup, getGroups, createGroup, addMember, getGroupsByInput, updateGroup, getRecommendedGroups } from "./controllers/groups.js";
import { updateUserByUsername, getAllUser, signin, signup, removeUser, updateUser, getUser, getUserProfile, getUserByUsername } from "./controllers/users.js";
import { createTags, getTags } from "./controllers/tags.js";

import { createPostEvent, createUsersEvents, createFakeUsers, createGroupEvent } from "./middleware/recommend.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getAllPosts);
router.get('/posts/:username', getPostsByUsername);

router.post('/discuss/create', createTags, createPostEvent, createPost);
router.get('/discuss/post/:id', getPostById);
router.get('/discuss/tags', getPostsByTags);
router.patch('/discuss/like/:id', likePost);
router.patch('/discuss/update/:id', createTags, updatePost);
router.delete('/discuss/post/:id', deletePost);

router.get('/discuss/user/:userName', getRecommendedPosts); //用假用户的名字

//Group

// router.get('/group/:id', getGroup);
router.post('/group/create', createTags, createGroupEvent, createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup);  // unused 
// router.delete('/group/:id', removeGroup); 
router.patch('/group/update/:id', createTags, updateGroup);
router.get('/group', getGroups);
router.get('/group/search/:input', getGroupsByInput);
router.get('/group/:username', getGroupByUser);
router.post('/group/quit', quitGroup)
router.post('/group/join', joinGroup)



router.get('/group/user/:userName', getRecommendedGroups); //用假用户的名字


//User
router.post('/signin', signin);
router.post('/signup', createUsersEvents, signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);
router.post('/user/update/:username', updateUserByUsername);
router.get('/profile/:username', getUserByUsername);
router.get('/user', getAllUser);
// router.get('/profile/:username', getUserProfile);


//Tags
router.get('/tags', getTags);
// router.delete('/tag/:id', removeTag);

//recommand
router.post('/fakeusers', createFakeUsers); //设置了三个有tag的用户：zpu2, frontendBoy, testBoy

export default router;
