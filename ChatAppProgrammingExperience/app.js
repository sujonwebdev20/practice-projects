require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New client connected");

  console.log(socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4040;
server.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT} -- Server is running on port: ${PORT}`);
});
