// DB configuration
function dbConnect() {
  const mongoose = require("mongoose");
  const uri = "mongodb://127.0.0.1:27017/realtime_comments";

  mongoose
    .connect(uri)
    .then(() =>
      console.log("Mongodb connection established: " + mongoose.connection.host)
    )
    .catch((err) => console.error(err));
}

module.exports = dbConnect;
