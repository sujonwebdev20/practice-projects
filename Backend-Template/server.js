const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is listening on host: http://localhost:" + port);
});
