const { userRegister } = require("../controllers/authController");

const router = require("express").Router();

router.post("/user-register", userRegister);

module.exports = router;
