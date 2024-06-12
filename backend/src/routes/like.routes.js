import express from "express";
import { likeController, likeGetController, likePostController, likeUserController } from "../controllers/likes.controllers.js";

const router = express.Router();

router.route("/like").post(likeController);
router.route("/like/user/:userID").get(likeUserController); // Adjusted route for user likes
router.route("/like/post/:postID").get(likePostController); // Adjusted route for post likes
router.route("/like").get(likeGetController);

export default router;
