// Module is being imported
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB.js";
import sendResponseMessage from "./utils/sendResponseMessage.js";

// Dotenv module is being initialize
dotenv.config();

// Express module is being initialize
const app = express();

// This is Cors options
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Server is being check
app.get("/", (req, res) => {
  sendResponseMessage(res, 200, true, "Server is working fine!");
});

// Middlewares is being initialize
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Port is importing from .env file
const port = process.env.PORT || 8000;

// The server is starting
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} 🎯🎯🎯`);
  connectDB();
});
