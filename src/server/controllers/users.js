import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Group from "../models/group.js";

import User from "../models/user.js";

import { createUsersEvents } from "../middleware/recommend.js";

const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });


        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signup = async (req, res) => {
    const { email, password, username, tags = [] } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, username: username, tags });
        console.log(result);

        await createUsersEvents(result._id.toString(), result.tags);

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message });

        //console.log(error);
    }
};

export const joinGroup = async (req, res, next) => {
    const { userId, groupId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(groupId)) return res.status(404).send(`No group with id: ${groupId}`);

    const user = await User.findById(userId);

    user.groups.push(groupId);
    await user.save();
    next();
}

export const removeUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with userId: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User removed successfully." });
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { tags };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    //   res.json(updatedUser);
    const user = await User.findById(id);
    res.json(user);
}

export const getUser = async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        //console.log(targetUser);
        res.status(200).json(targetUser);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const targetUser = await User.find({});
        // //console.log(targetUser);
        res.status(200).json(targetUser);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { userId, newUsername, email, tags } = req.body;
        // //console.log('tags in controller')
        // //console.log(tags);
        const targetUser = await User.findById(userId);
        let updated = targetUser;
        updated.tags = tags;
        updated.username = newUsername;
        updated.email = email;
        // //console.log('updated');
        // //console.log(updated[0]);
        const updatedGroup = await User.findByIdAndUpdate(
            userId,
            updated
        );
        // //console.log(targetUser);
        res.status(200).json(updated);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        // //console.log('get user profile')
        // //console.log(req.params.userId)
        const targetUser = await User.findById(req.params.userId);
        // //console.log(targetUser);

        res.status(200).json(targetUser);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getUserNames = async (req, res) => {
    try {
        const { members } = await Group.findById(req.params.groupId);
        const usernames = await User.find({
            '_id': {
                $in: members
            }
        }, 'username');
        // console.log(usernames);

        res.status(200).json(usernames);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}