import jwt from "jsonwebtoken";
import sendResponseMessage from "../utils/sendResponseMessage";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return sendResponseMessage(res, 401, false, "Unauthorized user");
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return sendResponseMessage(res, 401, false, "Invalid credential");
    }
    req.id = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
