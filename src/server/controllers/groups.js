import Group from "../models/group.js";
import mongoose from "mongoose";
import User from "../models/user.js";
import Tag from "../models/tag.js";

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
        const targetUser = await User.findById(req.params.userId).exec();

        const targetGroups = await Group.find({
            _id: { $in: targetUser.groups },
        });

        res.status(200).json(targetGroups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createGroup = async (req, res) => {
    const { groupName, groupIntro, tags, owner } = req.body;
    // console.log('tag in controller create');
    // console.log(tags);
    
    // const tagArray = [groupTag];
    const newGroup = await Group.createGroup({
        groupName,
        groupIntro,
        tags,
        owner,
    });
    const inputTag = await Tag.createTags(tags);
    try {
        await newGroup.save();
        let creator = await User.findById(owner);
        creator.groups.push(newGroup._id);
        // A.findByIdAndUpdate(id, update, options, callback) // executes
        const updatedUser = await User.findByIdAndUpdate(
            owner,
            creator
        );
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(204).json({ message: error.message });
    }
};

export const joinGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        console.log(`join group: ${groupId}, ${userId}`);
        const targetGroup = await Group.findById(groupId);
        let updated = targetGroup;
        if (targetGroup.members.includes(userId))
            res.status(200).json("already in, unable to join");
        else {
            console.log(updated)

            
            updated.memberCount += 1;
            updated.members.push(userId);
            const updatedGroup = await Group.findByIdAndUpdate(
                groupId,
                { 
                    memberCount: targetGroup.memberCount + 1,
                    members: updated.members
                 },
            );
            console.log(updatedGroup)

            let targetUser = await User.findById(userId);
            targetUser.groups.push(groupId);
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                targetUser
            );
            res.status(200).json(updatedGroup);
        }
    } catch (error) {
        res.status(404).json({ message: `asdfasf ${error.message}` });
    }
};

export const quitGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        const targetGroup = await Group.findById(groupId);

        let updated = targetGroup;
        updated.memberCount = updated.memberCount - 1;
        if (updated.memberCount > 0) {
            updated.members = updated.members.filter(
                (member) => member !== userId
            );
            const updatedGroup = await Group.findByIdAndUpdate(
                groupId,
                updated
            );
        } else {
            await Group.findByIdAndRemove(groupId );
        }
        let targetUser = await User.findById(userId);
        targetUser.groups = targetUser.groups.filter(
            (id) => `${id}` !== groupId
        );

        const updatedUser = await User.findByIdAndUpdate(
            userId,
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
    const { groupName, owner, tags, groupIntro, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No group with id: ${id}`);
    const updatedGroup = { groupName, owner, tags, groupIntro, avatar };
    let resGroup = await Group.findByIdAndUpdate(id, updatedGroup, { new: true });
    console.log(resGroup);
    return res.status(200).json(resGroup);
};

export const getRecommendedGroups = async (req, res) => {
    try {
        const ContentsType = "company";
        const RelatedContentsNames = await getRelatedContentsTitle(
            req.params.userId,
            ContentsType
        );

        function delay(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
        await delay(500);
        //console.log(RelatedContentsNames);
        const recommendedGroups = await Group.find( { groupName: { "$in": RelatedContentsNames } } );
        res.status(200).json(recommendedGroups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
