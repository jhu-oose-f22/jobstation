import Post from "../models/post.js"

export const getPosts = async (req, res) => {
    try {
        const targetPost = await Post.list();

        res.status(200).json(targetPost);
        console.log(targetPost);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500)
    }
}

