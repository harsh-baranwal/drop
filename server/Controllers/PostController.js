import mongoose from "mongoose";
import PostModel from "../Models/postModels.js";
import UserModel from "../Models/userModels.js";

// Create a new post
export const createPost = async(req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get a post
export const getPost = async(req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a post
export const deletePost = async(req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted")
        }
        else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Like/Dislike a post
export const likePost = async(req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if(!post.likes.includes(userId)) {
            await post.updateOne({$push: {likes: userId}})
            res.status(200).json("Liked")
        }
        else {
            await post.updateOne({$pull: {likes: userId}})
            res.status(200).json("Unliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Comment on post
export const postComment = async(req, res) => {
    const id = req.params.id;
    const comment = {
        content: req.body.content,
        userId: req.body.userId
    }

    try {
        const post = await PostModel.findById(id);
        await post.updateOne({$push: {comments: comment}});
        res.status(200).json("Commented")
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a comment
export const deleteComment = async(req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    const comment={
        _id:req.params.commentId
    }

    try {
        const post = await PostModel.findById(id);
        if (userId === post.userId) {
            await post.updateOne({$pull: {comments: comment}});
            res.status(200).json("Comment deleted");
        }
        else {
            res.status(403).json("Access Denied! You can not delete other's comment");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get a timeline
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id
    try {
      const currentUserPosts = await PostModel.find({ userId: userId });
  
      const followingPosts = await UserModel.aggregate([
        { 
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
    } catch (error) {
      res.status(500).json(error);
    }
};