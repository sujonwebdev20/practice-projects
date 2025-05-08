function sendResponseMessage(res, statusCode, success, message, data = null) {
  if (!data) {
    return res.status(statusCode).json({
      success,
      message,
    });
  }
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
}
export default sendResponseMessage;
