/* Get login page */
const getLogin = (req, res, next) => {
  console.log(res);
  try {
    res.render("pages/login", { title: res.locals.title });
  } catch (error) {
    next(error);
  }
};

/* Login controller */

/* Get register page */
const getRegister = (req, res, next) => {
  try {
    res.render("pages/register", { title: res.locals.title });
  } catch (error) {
    next(error);
  }
};

/* Register controller */
const register = (req, res, next) => {
  console.log("from controller", req.body);
  console.log("from controller", req.file);
};

module.exports = {
  getLogin,
  getRegister,
  register,
};
