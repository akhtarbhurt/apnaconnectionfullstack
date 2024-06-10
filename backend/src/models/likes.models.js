import mongoose, { Schema, Types } from "mongoose";

const likesSchema = new Schema({
    likeBy: {
        type: String,
        required: true
    },
    like:{
        type: Boolean,
        default: false
    },
    userID:{
        type: Types.ObjectId,
        required: true
    },
    postID:{
        type: Types.ObjectId,
        required: true
    }
})

const Likes = mongoose.model("like",likesSchema)

export {Likes}