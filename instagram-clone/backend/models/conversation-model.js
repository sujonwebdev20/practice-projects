import { Schema, model, Types } from "mongoose";

const conversationSchema = new Schema({
  participants: [{ type: Types.ObjectId, ref: "User" }],
  message: [{ type: Types.ObjectId, ref: "Message" }],
});

export const ConversationModel = model("Conversation", conversationSchema);
