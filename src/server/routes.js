// TODO
// can delete this file
import express from "express";

<<<<<<< HEAD

=======
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
import { getAllPosts, createPost, getPostById, getPostsByTags, likePost, deletePost, updatePost, getRecommendedPosts } from "./controllers/posts.js";

import { quitGroup, getGroupByUser, joinGroup, getGroups, createGroup, addMember, getGroupsByInput, updateGroup, getRecommendedGroups } from "./controllers/groups.js";
import { getAllUser, signin, signup, removeUser, updateUser, getUser, getUserByUsername } from "./controllers/users.js";
import { createTags, getTags } from "./controllers/tags.js";

<<<<<<< HEAD
import { createPostEvent, createUsersEvents, createFakeUsers, createGroupEvent } from "./middleware/recommend.js";
=======
import { createPostEvent, createFakeUsers, createGroupEvent } from "./middleware/recommend.js";

>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f

const router = express.Router();

//Discuss 
router.get('/discuss', getAllPosts);
router.post('/discuss/create', createTags, createPostEvent, createPost);
router.get('/discuss/post/:id', getPostById);
router.get('/discuss/tags', getPostsByTags);
router.patch('/discuss/like/:id', likePost);
router.patch('/discuss/update/:id', createTags, updatePost);
router.delete('/discuss/post/:id', deletePost);

router.get('/discuss/user/:userName', getRecommendedPosts); //用假用户的名字

//Group
<<<<<<< HEAD
=======

>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
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
<<<<<<< HEAD
=======

>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f


//User
router.post('/signin', signin);
<<<<<<< HEAD
router.post('/signup', createUsersEvents, signup);
router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);


// router.get('/user/:id', getUser);


router.get('/user/:username', getUserByUsername);




=======
router.post('/signup', signup);

router.delete('/user/:id', removeUser);
router.patch('/user/update/:id', updateUser);
router.get('/user/:username', getUserByUsername);
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
router.get('/user', getAllUser);


//Tags
router.get('/tags', getTags);
// router.delete('/tag/:id', removeTag);

//recommand
router.post('/fakeusers', createFakeUsers); //设置了三个有tag的用户：zpu2, frontendBoy, testBoy
<<<<<<< HEAD
=======

>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f

export default router;
