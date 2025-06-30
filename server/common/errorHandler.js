const { errorResponse } = require("../responses");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, statusCode, message);
};

module.exports = errorHandler;
