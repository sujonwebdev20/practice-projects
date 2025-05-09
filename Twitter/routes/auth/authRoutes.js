/* Require dependencies */
const dotenv = require("dotenv");
const { Router } = require("express");
const {
  getLogin,
  getRegister,
} = require("../../controllers/auth/authControllers");
const decorateHtmlResponse = require("../../middlewares/common/decorateHtmlResponse");
const { notFoundHandler } = require("../../middlewares/common/errorHandler");

dotenv.config();

const router = Router();

/* Login router */
router.get(
  "/login",
  decorateHtmlResponse(`${process.env.APP_NAME} - Login`),
  getLogin
);

/* Register router */
router.get(
  "/register",
  decorateHtmlResponse(`${process.env.APP_NAME} - register`),
  getRegister
);

/* Not found router */
router.get(
  "/*",
  notFoundHandler,
  decorateHtmlResponse(`${process.env.APP_NAME} - Not found`)
);

module.exports = router;
