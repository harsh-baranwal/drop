import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";

dotenv.config();

// Routes
const app = express();


// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use(express.static('public')); 
app.use('/images', express.static('images'));

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}`))).catch((error) => console.log(error));

app.use('/auth', AuthRoute); // Uses the Authentication route
app.use('/user', UserRoute); // Uses the User route
app.use('/posts', PostRoute); // Uses the Post route
app.use('/upload', UploadRoute); // Uses the Upload route