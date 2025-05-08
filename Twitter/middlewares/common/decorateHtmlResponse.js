const decorateHtmlResponse = (pageTitle) => {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = pageTitle;
    next();
  };
};

module.exports = decorateHtmlResponse;
