import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from '../Models/userModels.js'


// Registering a new user
export const registerUser = async(req, res) => {
    const {username, email, password, fullname} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({username, email, password: hashedPassword, fullname})

    try {
        const oldUser = await UserModel.findOne({email});
        if (oldUser) {
            res.status(400).json({message: "Email is already registered"})
        }
        const user = await newUser.save()
        const token = jwt.sign({
            email: user.email, id: user._id
        }, process.env.JWT_KEY, {expiresIn: "3h"})
        res.status(200).json({user, token}) // It pass all functions of new user untill it saved to database.
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Login a existing user
export const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email: email}); // Returns user exist or not
        if (user) {
            const validity = await bcrypt.compare(password, user.password);
            if (!validity) {
                res.status(400).json("Wrong Password")
            }
            else {
                const token = jwt.sign({
                    email: user.email, id: user._id
                }, process.env.JWT_KEY, {expiresIn: "3h"})
                res.status(200).json({user, token})
            }
        }
        else {
            res.status(404).json("User doesn't exist");
        }
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}