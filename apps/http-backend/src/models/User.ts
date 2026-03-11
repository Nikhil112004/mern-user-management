import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true },
    mobile: { type: String, required: true},
    gender: { type: String},
    status: {type: String},
    location: {type: String},
    profile: {type: String}
},
{    timestamps: true }
)


export const User = mongoose.model("User", userSchema)