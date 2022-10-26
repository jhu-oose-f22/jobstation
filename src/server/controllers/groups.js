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
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);

    const group = await Group.findById(groupId);

    group.member.push(userId);
    await group.save();
    res.json(group);
}

export const removeGroup = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Group with id: ${id}`);
    await Group.findByIdAndRemove(id);
    res.json({ message: "Group removed successfully." });
}

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { groupName, owner, tags, intro, avatar } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No group with id: ${id}`);
    const updatedGroup = { groupName, owner, tags, intro, avatar, _id: id };
    await Group.findByIdAndUpdate(id, updatedGroup, { new: true });
    res.json(updatedGroup);
}