import express from "express";

import { getPosts, createPost, getPost, getPostsByTags, likePost } from "./controllers/posts.js";
import { getGroup, createGroup, addMember } from "./controllers/groups.js";
// import { signin, signup } from "./controllers/users.js";

const router = express.Router();

//Discuss 
router.get('/discuss', getPosts);
router.post('/discuss/create', createPost);
router.get('/discuss/post/:id', getPost);
router.patch('/discuss/like/:id', likePost);

//Group
router.get('/group/:id', getGroup);
router.post('/group/create', createGroup);
router.patch('/group/:groupId/user/:userId', addMember) //need usercontroller "joinGroup" after adding user

//User
// router.post("/signin", signin);
// router.post("/signup", signup);

export default router;