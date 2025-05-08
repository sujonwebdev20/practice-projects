const express = require("express");
const dbConnect = require("./db");
const Comment = require("./models/comment");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to server!");
});

app.post("/api/comment", (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });
  comment.save().then((response) => {
    res.send(response);
  });
});

app.get("/api/comments", (req, res) => {
  Comment.find().then((comments) => {
    res.send(comments);
  });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  dbConnect();
  console.log("Server is listening on port: " + port);
});

let io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);
  // Receive event
  socket.on("comment", (data) => {
    console.log(data);
    data.time = new Date();
    socket.broadcast.emit("comment", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
