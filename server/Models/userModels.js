import mongoose from "mongoose";


//Schema of Users
const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        about: String,
        location: String,
        profession: String,
        followers: [],
        followings: []
    },
    {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;