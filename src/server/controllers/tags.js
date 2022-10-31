import Tag from "../models/tag.js";

export const createTags = async (req, res, next) => {
    const { tags } = req.body;
    try {
        const newTags = await Tag.createTags(tags);
        console.log("newTags");
        console.log(newTags);
        next();
    } catch (error) {
        res.status(204).json({ message: error.message });
        next();
    }
}

export const getTags = async (req, res) => {
    try {
        const targetTags = await Tag.list();

        req.status(201).json(targetTags);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

