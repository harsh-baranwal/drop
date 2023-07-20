import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post('/signup', registerUser); // Router for Signup
router.post('/login', loginUser); // Router for Login

export default router;