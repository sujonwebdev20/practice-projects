/* Require dependencies */
const dotenv = require("dotenv");
const { Router } = require("express");
const decorateHtmlResponse = require("../../middlewares/common/decorateHtmlResponse");
const { notFoundHandler } = require("../../middlewares/common/errorHandler");
const {
  getLogin,
  getRegister,
  register,
} = require("../../controllers/auth/authControllers");
const avatarUpload = require("../../middlewares/common/avatarUpload");

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
  decorateHtmlResponse(`${process.env.APP_NAME} - SignUp`),
  getRegister
);
router.post(
  "/register",
  decorateHtmlResponse(`${process.env.APP_NAME} - SignUp`),
  avatarUpload,
  register
);

/* Not found router */
router.get(
  "/*",
  decorateHtmlResponse(`${process.env.APP_NAME} - Not found`),
  notFoundHandler
);

module.exports = router;
