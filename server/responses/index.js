const succcesResponse = (res, statusCode = 200, data) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

const errorResponse = (res, statusCode = 500, message = "Unexpected error") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { errorResponse, succcesResponse };
