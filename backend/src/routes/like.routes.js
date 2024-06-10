import express from "express";
import { likeController, likeGetController, likeUserController } from "../controllers/likes.controllers.js";

const router = express.Router();

router.route("/like").post(likeController);
router.route("/like/:userID").get(likeUserController);
router.route("/like").get(likeGetController);

export default router;
