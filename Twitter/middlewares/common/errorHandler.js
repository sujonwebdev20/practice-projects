/* require dependencies */
const createError = require("http-errors");

/* Not Found handler */
function notFoundHandler(req, res, next) {
  return next(createError(404, "Your requested page was not found!"));
}

/* Error handler */
function errorHandler(err, req, res, next) {
  const isDevelopmentMode = process.env.NODE_ENV === "development";
  const error = isDevelopmentMode
    ? err
    : { message: err.message, status: err.status };
  // check is DEVELOPMENT mode or PRODUCTION mode
  isDevelopmentMode
    ? console.log("❌ This is development mode ❌", error)
    : console.log("❌ This is production mode ❌", error);

  if (res.headersSent) {
    return next(error);
  }

  try {
    // res.locals.error = error;
    // res.status(error.status || 500);
    // console.log(res.locals);

    if (
      res.locals.html ||
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production"
    ) {
      return res.render("pages/error", { title: res.locals.title, error });
    }

    return res.json({ status: error.status || 500, ...error });
  } catch (renderError) {
    next(renderError);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
