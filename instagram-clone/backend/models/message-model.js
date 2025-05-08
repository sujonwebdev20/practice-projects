import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
  senderId: { type: Types.ObjectId, ref: "User" },
  receiverId: { type: Types.ObjectId, ref: "User" },
  message: [{ type: String, required: true }],
});

export const MessageModel = model("Message", messageSchema);
