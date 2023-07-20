import express from "express";
import { createPost, deleteComment, deletePost, getPost, getTimelinePosts, likePost, postComment } from "../Controllers/PostController.js";

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.put('/:id/comment', postComment);
router.delete('/:id/deletecomment/:commentId', deleteComment);
router.get("/:id/timeline", getTimelinePosts)

export default router;