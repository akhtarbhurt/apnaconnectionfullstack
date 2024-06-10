import { Likes } from "../models/likes.models.js";

const likeController = async (req, res) => {
    try {
        const { likeBy, userID, postID } = req.body;

        // Check if the user has already liked the post
        const existingLike = await Likes.findOne({ likeBy, userID, postID });

        if (existingLike) {
            // If the like exists, remove it (unlike)
            await Likes.findByIdAndDelete(existingLike._id);
            return res.status(200).json({ message: "Unliked successfully" });
        } else {
            // If the like does not exist, create a new like
            const payload = await Likes.create({ likeBy, userID, postID, like: true });
            return res.status(200).json({ result: payload });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const likeGetController = async (req, res) => {
    try {
        const payload = await Likes.find();
        if (!payload) return res.status(400).json({ error: "no data found" });
        return res.status(200).json({ result: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const likeUserController = async (req, res) => {
    try {
        const { userID } = req.params;
        const payload = await Likes.find({ userID });
        if (!payload) return res.status(400).json({ error: "no data found" });
        return res.status(200).json({ result: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export { likeController, likeGetController, likeUserController };
