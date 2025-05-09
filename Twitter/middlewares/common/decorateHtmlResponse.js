const decorateHtmlResponse = (pageTitle) => {
  console.log(pageTitle);
  return (err, req, res, next) => {
    console.log("--------------------", err);
    res.locals.html = true;
    res.locals.title = pageTitle;
    next();
  };
};

module.exports = decorateHtmlResponse;
