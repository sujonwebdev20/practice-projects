const dotenv = require("dotenv");
const express = require("express");
const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");

dotenv.config();
const app = express();

app.use("/api/messenger", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
  res.send();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  databaseConnect();
  console.log("Server is listening on http://localhost:" + port + " ✔️");
});
