import Group from "../models/group.js";
import mongoose from "mongoose";


export const getGroup = async (req, res) => {
    try {
        const targetGroup = await Group.findById(req.params.id);
        res.status(200).json(targetGroup);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createGroup = async (req, res) => {
    const {groupName, owner, member, tags, intro, avatar} = req.body;
    const newGroup = await Group.createGroup({groupName, owner, member, tags, intro, avatar});
    try {
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(204).json({ message: error.message});
    }
}

export const addMember = async (req, res) => {
    const { groupId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(groupId)) return res.status(404).send(`No group with id: ${groupId}`);
    //check whether member is valid after adding users
    const group = await Group.findById(groupId);

    group.member.push(userId);
    await group.save();
    res.json(group);
}
