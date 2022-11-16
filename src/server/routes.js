// TODO
// can delete this file
import express from "express";

import {
    getAllPosts,
    createPost,
    getPostById,
    getPostsByUserId,
    getPostsByTags,
    likePost,
    deletePost,
    updatePost,
    getRecommendedPosts,
    createComment,
    deleteComment,
    likeComment,
    getComments, getComment,
    getPostsBySearch
} from "./controllers/posts.js";

import { quitGroup, getGroupByUser, joinGroup, getGroups, createGroup, addMember, getGroupsByInput, updateGroup, getRecommendedGroups, getGroupById } from "./controllers/groups.js";
import { updateUserById, getAllUser, signin, signup, removeUser, updateUser, getUserById, getUserNames } from "./controllers/users.js";
import { createTags, getTags } from "./controllers/tags.js";

import { createPostEvent, createUsersEvents, createFakeUsers, createGroupEvent } from "./middleware/recommend.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getAllPosts);
// 00
router.get('/posts/:userId', getPostsByUserId);

router.post('/discuss/create', createTags, createPost);
// router.post('/discuss/create', createTags, createPostEvent, createPost);
router.get('/discuss/post/:id', getPostById);
router.get('/discuss/tags', getPostsByTags);
router.patch('/discuss/like/:id', likePost);
router.get('/discuss/search/:input', getPostsBySearch);
router.patch('/discuss/update/:id', createTags, updatePost);
router.delete('/discuss/post/:id', deletePost);
router.post('/discuss/comment', createComment);
router.get('/discuss/comment/:id', getComment); //for test
router.get('/discuss/post/:id/comments', getComments);
router.delete('/discuss/post/:postId/comment/:commentId', deleteComment);
router.patch('/discuss/comment/like/:id', likeComment);

router.get('/discuss/user/:id', getRecommendedPosts);

//Group

router.get('/group/find/:id', getGroupById);
router.post('/group/create', createTags, createGroup);
// router.post('/group/create', createTags, createGroupEvent, createGroup);
router.patch('/group/:groupId/user/:userId', addMember, joinGroup);  // unused 
// router.delete('/group/:id', removeGroup); 
router.patch('/group/update/:id', createTags, updateGroup);
router.get('/group', getGroups);
router.get('/group/search/:input', getGroupsByInput);
router.get('/group/:userId', getGroupByUser);
router.post('/group/quit', quitGroup)
router.post('/group/join', joinGroup)

router.get('/group/user/:id', getRecommendedGroups);

//User
router.post('/signin', signin);
// router.post('/signup', createUsersEvents, signup);
router.post('/signup', signup);
// router.post('/createUserEvent', createUsersEvents);
router.delete('/user/:id', removeUser);
// router.patch('/user/update/:id', updateUser);

router.post('/user/update', updateUserById);
router.get('/profile/:userId', getUserById);

router.get('/user', getAllUser);

// router.get('/profile/:username', getUserProfile);
router.get('/groupuser/:groupId', getUserNames);

//Tags
router.get('/tags', getTags);
// router.delete('/tag/:id', removeTag);

//recommand
router.post('/fakeusers', createFakeUsers);

export default router;
