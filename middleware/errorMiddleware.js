const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  // Handle Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;
