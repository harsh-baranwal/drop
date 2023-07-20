import UserModel from "../Models/userModels.js";
import jwt from 'jsonwebtoken';

// Get a user
export const getUser = async(req, res) => {
    const id = req.params.id; //Fetch ID of the user from request

    try {
        const user = await UserModel.findById(id);
        if (user) {
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails);
        }
        else {
            res.status(404).json("No such user exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update user 
export const updateUser = async(req, res) => {
    const id = req.params.id;

    const { _id, currentUserAdminStatus} = req.body;

    if (id === _id) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true, })
            const token = jwt.sign({
                email: user.email, id: user._id
            }, process.env.JWT_KEY, {expiresIn: "3h"})
            res.status(200).json({user, token});
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("Access Denied! You can only update your own profile");
    }
}

// Delete existing user 
export const deleteUser = async(req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus} = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("Access Denied! You can only delete your own profile");
    }
}

// Follow a user
export const followUser = async (req, res) => {
    const id = req.params.id;
  
    const { _id } = req.body;
  
    if (_id === id) {
      res.status(403).json("Action forbidden");
    } else {
      try {
        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(_id);
  
        if (!followUser.followers.includes(_id)) {
          await followUser.updateOne({ $push: { followers: _id } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User followed!");
        } else {
          res.status(403).json("User is Already followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
};
  
  // UnFollow a User
  export const UnFollowUser = async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId } = req.body;
  
    if (currentUserId === id) {
      res.status(403).json("Action forbidden");
    } else {
      try {
        const followUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(currentUserId);
  
        if (followUser.followers.includes(currentUserId)) {
          await followUser.updateOne({ $pull: { followers: currentUserId } });
          await followingUser.updateOne({ $pull: { following: id } });
          res.status(200).json("User Unfollowed!");
        } else {
          res.status(403).json("User is not followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  };

  export const getAllUser = async (req, res) => {

    try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// Searching a user
// export const searchUser = async (req, res) => {}