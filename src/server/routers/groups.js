import express from "express";
import {addMember, createGroup, getGroup, removeGroup} from "../controllers/groups.js";

const router = express.Router();

//Group
router.get('/group/:id', getGroup);
router.post('/group/create', createGroup);
router.patch('/group/:groupId/user/:userId', addMember); //need usercontroller "joinGroup" after adding user
router.delete('/group/:id', removeGroup);

