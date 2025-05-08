/***** Login controller *****/
const getLogin = (req, res, next) => {
  try {
    res.render("pages/login");
  } catch (error) {
    next(error);
  }
};

/***** Login controller *****/
const getRegister = (req, res, next) => {
  try {
    res.render("pages/register");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRegister,
  getLogin,
};
