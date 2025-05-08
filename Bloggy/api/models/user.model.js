import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  bio: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: "avatar.png",
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
    trim: true,
  },
});

export default mongoose.model("User", userSchema);
