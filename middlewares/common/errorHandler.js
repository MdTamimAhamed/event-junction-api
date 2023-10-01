const createError = require("http-errors");

//404 error
function notFoundHandler(req, res, next) {
  next(createError(404, "Content not found!"));
}

//default error
function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).json({ error: `Internal server error : ${err}` });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
