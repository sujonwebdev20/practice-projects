/***** require dependencies *****/
const dotenv = require("dotenv");
const { Router } = require("express");
const {
  getLogin,
  getRegister,
} = require("../../controllers/auth/authControllers");
const decorateHtmlResponse = require("../../middlewares/common/decorateHtmlResponse");

dotenv.config();
const router = Router();
const appName = process.env.APP_NAME;

/***** Login router *****/
router.get("/login", decorateHtmlResponse(`${appName} - Login`), getLogin);

/***** Register router *****/
router.get(
  "/register",
  decorateHtmlResponse(`${appName} - Login`),
  getRegister
);

module.exports = router;
