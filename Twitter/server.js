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
/* start server for listen */
app.listen(PORT, () => {
  console.log("Server is listening at host: http://localhost:" + PORT + "🛜");
});
