/***** require dependencies *****/
const createError = require("http-errors");

/***** Not Found handler *****/
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested page was not found!"));
}

/***** Error handler *****/
function errorHandler(err, req, res, next) {
  const error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  if (res.headersSent) {
    next(error);
  } else {
    try {
      res.locals.error = error;
      res.status(error.status || 500);

      if (res.locals.html) {
        res.render("pages/error", { title: "Error page" });
      } else {
        res.json(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
