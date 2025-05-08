import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  post: [{ type: Types.ObjectId, ref: "Post", required: true }],
});

export const CommentModel = model("Comment", commentSchema);
