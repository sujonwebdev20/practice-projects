import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model.js";
import sendResponseMessage from "../utils/sendResponseMessage.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

/***** Register Handler *****/
export const register = async (req, res) => {
  try {
    // Body data destructuring
    const { username, email, password } = req.body;
    // Checking incoming data fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    // Find registered user from collection of database
    const userModel = await UserModel.findOne({ email });
    if (userModel) {
      return res.status(409).json({
        success: false,
        message: "Please try different email address!",
      });
    }
    // Password is being hashing using bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // Creating a new user
    const newUser = UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return sendResponseMessage(
      res,
      201,
      true,
      "Account has been created successfully! 👍"
    );
  } catch (error) {
    console.log(error);
  }
};

/***** Login Handler *****/
export const login = async (req, res) => {
  try {
    // Body data destructuring
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponseMessage(
        res,
        400,
        false,
        "Email and Password required!"
      );
    }
    // Find registered user from collection of database
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return sendResponseMessage(res, 401, false, "Email or Password invalid!");
    }
    // Check password is match
    const isPasswordMatch = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return sendResponseMessage(res, 401, false, "Email or Password invalid!");
    }

    const existingUserData = {
      _id: existingUser?._id,
      username: existingUser.username,
      email: existingUser.email,
      profilePicture: existingUser.profilePicture,
      bio: existingUser.bio,
      followers: existingUser.followers,
      following: existingUser.following,
      posts: existingUser.posts,
      bookmarks: existingUser.bookmarks,
    };

    // JWT Generated token
    const token = await jwt.sign(
      { userId: existingUser?._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return sendResponseMessage(
      res,
      200,
      true,
      `Welcome back ${existingUser.username}`,
      existingUserData
    );
  } catch (error) {
    console.log(error);
  }
};

/***** Logout Handler *****/
export const logout = (_, res) => {
  try {
    return res
      .clearCookie("token")
      .json(sendResponseMessage(res, 200, true, "Logout successful!"));
  } catch (error) {
    console.log(error);
  }
};

/***** Get profile *****/
export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await UserModel.findById({ userId }).select(
      "-password"
    );
    return sendResponseMessage(res, 200, true, "", existingUser);
  } catch (error) {
    console.log(error);
  }
};

/***** Edit profile *****/
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }
    const existingUser = await UserModel.findById({ userId });
    if (!existingUser) {
      return sendResponseMessage(res, 404, false, "User not found!");
    }

    if (bio) existingUser.bio = bio;
    if (gender) existingUser.gender = gender;
    if (profilePicture) existingUser.profilePicture = cloudResponse.secure_url;

    await existingUser.save();

    return sendResponseMessage(res, 200, true, "Profile updated", existingUser);
  } catch (error) {
    console.log(error);
  }
};

/***** Suggested users *****/
export const getSuggestedUser = async (req, res) => {
  try {
    const suggestedUser = await UserModel.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUser) {
      return sendResponseMessage(
        res,
        400,
        false,
        "Currently don't have any users"
      );
    }
    return sendResponseMessage(res, 200, true, "", suggestedUser);
  } catch (error) {
    console.log(error);
  }
};

/***** Follow or Unfollow Handler *****/
export const followOrUnfollow = async (req, res) => {
  try {
    const followKarneWala = req.id;
    const jiskoFollowKarunga = req.params.id;
  } catch (error) {
    console.log(error);
  }
};
