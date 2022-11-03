import Group from "../models/group.js";
import mongoose from "mongoose";
import User from "../models/user.js";
import Tag from "../models/tag.js";
import { updateUser } from "./users.js";

import { getRelatedContentsTitle } from "../middleware/recommend.js";

export const getGroups = async (req, res) => {
    try {
        const targetGroup = await Group.find();
        res.status(200).json(targetGroup);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getGroupsByInput = async (req, res) => {
    try {
        const input = req.params.input;

        const targetGroups = await Group.find({
            $or: [
                {
                    groupName: { $regex: input, $options: "i" },
                },
                {
                    groupIntro: { $regex: input, $options: "i" },
                },
                {
                    tags: { $regex: input, $options: "i" },
                },
            ],
        });

        res.status(200).json(targetGroups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getGroupByUser = async (req, res) => {
    try {
        const targetUser = await User.findOne({
            username: req.params.username,
        });

        const targetGroups = await Group.find({
            _id: { $in: targetUser.groups },
        });

        // console.log("target groups");
        // console.log(targetGroups);
        res.status(200).json(targetGroups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createGroup = async (req, res) => {
    const { groupName, groupIntro, groupTag, owner } = req.body;
    console.log('tag in controller create');
    console.log(groupTag);
    
    // const tagArray = [groupTag];
    const newGroup = await Group.createGroup({
        groupName,
        groupIntro,
        groupTag,
        owner,
    });
    const inputTag = await Tag.createTags(groupTag);
    try {
        await newGroup.save();
        let creator = await User.findOne({ username: owner });
        creator.groups.push(newGroup._id);
        const updatedUser = await User.findOneAndUpdate(
            { username: owner },
            creator
        );
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(204).json({ message: error.message });
    }
};

export const joinGroup = async (req, res) => {
    try {
        const { groupId, username } = req.body;
        const targetGroup = await Group.findById(groupId);
        if (targetGroup.members.includes(username))
            res.status(200).json("already in, unable to join");
        else {
            let updated = targetGroup;
            updated.memberCount += 1;
            updated.members.push(username);
            const updatedGroup = await Group.findOneAndUpdate(
                { _id: groupId },
                updated
            );
            let targetUser = await User.findOne({ username: username });
            targetUser.groups.push(groupId);
            const updatedUser = await User.findOneAndUpdate(
                { username: username },
                targetUser
            );
            res.status(200).json(updatedGroup);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const quitGroup = async (req, res) => {
    try {
        const { groupId, username } = req.body;

        const targetGroup = await Group.findById(groupId);

        let updated = targetGroup;
        updated.memberCount = updated.memberCount - 1;
        if (updated.memberCount > 0) {
            updated.members = updated.members.filter(
                (member) => member !== username
            );
            const updatedGroup = await Group.findOneAndUpdate(
                { _id: groupId },
                updated
            );
        } else {
            await Group.findOneAndDelete({ _id: groupId });
        }
        let targetUser = await User.findOne({ username: username });
        targetUser.groups = targetUser.groups.filter(
            (id) => `${id}` !== groupId
        );

        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            targetUser
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addMember = async (req, res) => {
    const { groupId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(groupId))
        return res.status(404).send(`No group with id: ${groupId}`);
    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).send(`No user with id: ${userId}`);

    const group = await Group.findById(groupId);

    group.member.push(userId);
    await group.save();
    res.json(group);
};

export const removeGroup = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Group with id: ${id}`);
    await Group.findByIdAndRemove(id);
    res.json({ message: "Group removed successfully." });
};

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { groupName, owner, tags, intro, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No group with id: ${id}`);
    const updatedGroup = { groupName, owner, tags, intro, avatar, _id: id };
    await Group.findByIdAndUpdate(id, updatedGroup, { new: true });
    res.json(updatedGroup);
};

export const getRecommendedGroups = async (req, res) => {
    try {
        const ContentsType = "company";
        const RelatedContentsNames = await getRelatedContentsTitle(
            req.params.userName,
            ContentsType
        );

        function delay(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
        await delay(1000);
        // console.log("res from api");
        // console.log(RelatedContentsNames);
        const recommendedGroups = await Group.find({
            groupName: { $in: RelatedContentsNames },
        });

        // console.log("recommended in controller");
        // await delay(1000);

        // console.log(recommendedGroups);
        res.status(200).json(recommendedGroups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
