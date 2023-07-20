import mongoose from "mongoose";

// Schema of posts
const PostSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: String,
        likes: [],
        comments: [{ content: String, userId: String }],
        image: String,
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model("Posts", PostSchema)

export default PostModel;