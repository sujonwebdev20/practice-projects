const mongoose = require("mongoose");

const databaseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Mongodb connection established!! 🌿"))
    .catch((err) => console.log(err));
};
module.exports = databaseConnect;
