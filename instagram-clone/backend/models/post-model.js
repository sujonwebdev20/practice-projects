import { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
  caption: { type: String, default: "" },
  image: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
});

export const PostModel = model("Post", postSchema);
