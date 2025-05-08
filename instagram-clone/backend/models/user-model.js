import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female"] },
    followers: [{ type: Types.ObjectId, ref: "User" }],
    following: [{ type: Types.ObjectId, ref: "User" }],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    bookmarks: [{ type: Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
