import { handleError } from "../helpers/handleErrors.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* user register controller */
export const register = async (req, res, next) => {
  try {
    // getting data
    const { name, email, password } = req.body;
    // check if user already exists
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      next(handleError(409, "User already exists"));
    }
    // hashing password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // create a new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    // sending response
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

/* user login controller */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = UserModel.findOne({ email });
    if (!user) {
      next(handleError(400, "Invalid email or password"));
    }
    const hashedPassword = user.password;
    const comparePassword = bcrypt.compareSync(password, hashedPassword);
    if (!comparePassword) {
      next(handleError(400, "Invalid email or password"));
    }
    const token = jwt.sign(
      {
        id: user?._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {}
};
