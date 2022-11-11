// TODO
// can delete this file
import express from "express";

import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost, getRecommendedPosts, createComment, deleteComment, likeComment, getComments, getComment } from "./controllers/posts.js";

import { quitGroup, getGroupByUser, joinGroup, getGroups, createGroup, addMember, getGroupsByInput, updateGroup, getRecommendedGroups } from "./controllers/groups.js";
import { getAllUser, signin, signup, removeUser, updateUser, getUser, getUserByUsername } from "./controllers/users.js";
import { createTags, getTags } from "./controllers/tags.js";

import { createPostEvent, createUsersEvents, createFakeUsers, createGroupEvent } from "./middleware/recommend.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getAllPosts);
router.post('/discuss/create', createTags, createPostEvent, createPost);
router.get('/discuss/post/:id', getPostById);
router.get('/discuss/tags', getPostsByTags);
router.patch('/discuss/like/:id', likePost);
router.patch('/discuss/update/:id', createTags, updatePost);
router.delete('/discuss/post/:id', deletePost);
router.post('/discuss/comment', createComment);
router.get('/discuss/comment/:id', getComment); //for test
router.get('/discuss/post/:id/comments', getComments);
router.delete('/discuss/post/:postId/comment/:commentId', deleteComment);
router.patch('/discuss/comment/like/:id', likeComment);

router.get('/discuss/user/:userName', getRecommendedPosts);

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

router.get('/group/user/:userName', getRecommendedGroups); 


//User
router.post('/signin', signin);
router.post('/signup', createUsersEvents, signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);
router.get('/user/:username', getUserByUsername);
router.get('/user', getAllUser);


//Tags
router.get('/tags', getTags);
// router.delete('/tag/:id', removeTag);

//recommand
router.post('/fakeusers', createFakeUsers);

export default router;
