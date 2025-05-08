import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";
import { Message, User } from "./interfaces";

const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://loacalhost:5173",
        methods: ["GET", "POST"]
    }
})


const users = new Map<string, User>();
const messages: Message[] = [];

console.log("Map function", users);


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id} 🎉`);

    socket.on("join", (username: string) => {
        users.set(socket.id, {id: socket.id, username: username});
        io.emit("userList", Array.from(users.values()));
        io.emit("userJoined", username);
        io.emit("messageHistory", messages)
    });

    socket.on("sendMessage", (message: string) => {
        const user = users.get(socket.id);
        if (user) {
            const msg: Message = {user, message, timestamps: new Date()};
            messages.push(msg);
            io.emit("newMessage", msg);
        }
    })

    socket.on("disconnect", () => {
        const user = users.get(socket.id);
        if (user) {
            console.log(`User disconnected: ${user.username} 😞`);
            users.delete(socket.id);
            io.emit("userList", Array.from(users.values()));
            io.emit("userLeft", user.username);
        }
    })
})


const PORT: number = 8080;

httpServer.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT} ✅`)
})
