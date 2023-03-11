import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);  // this get the user feeds on the home page, it gonna post everythings that exist on the database on the home page
router.get("/:userId/posts", verifyToken, getUserPosts);  // this will grabe only the userid relevant

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
