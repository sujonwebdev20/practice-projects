/* require dependencies */
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/common/errorHandler");
const authRouter = require("./routes/auth/authRoutes");
const mongoose = require("mongoose");

/* Configuration */
dotenv.config();
const app = express();

/* View engine setup */
app.set("view engine", "pug");
app.set("views", "./views");

/* Middlewares initialize */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

/* Routes middleware */
app.use(authRouter);

/* Error handler middlewares */
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "twitter",
  })
  .then((value) => {
    console.log("Database is connected:✅", value.connection.name);
    /* start server for listen */
    app.listen(PORT, () => {
      console.log(
        "Server is listening at host: http://localhost:" + PORT + "🛜"
      );
    });
  })
  .catch((error) => {
    console.log("Database is not connected:❌", error);
  });
