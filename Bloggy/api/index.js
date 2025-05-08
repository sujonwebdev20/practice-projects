import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { DATABASE_NAME } from "./constants.js";
import authRoute from "./routes/auth.route.js";

morgan("dev");
env.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// middleware routes
app.use("/api/auth", authRoute);

// connect to database
mongoose
  .connect(process.env.MONGODB_URI, { dbName: DATABASE_NAME })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log();

  console.log(`Server running on port ${PORT} ${process.env.NODE_ENV}`);
});

// handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
