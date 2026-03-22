const { ApiError } = require('../exceptions/ApiError');
const { sendResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  if (!(err instanceof ApiError) && !statusCode) {
    statusCode = 500;
    message = process.env.NODE_ENV === 'test' ? err.message : 'Internal Server Error';
  }

  // Log error
  console.error(err);

  // Stack trace protection
  const stackTrace = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  return sendResponse(res, statusCode || 500, false, message, null, stackTrace);
};

module.exports = errorMiddleware;
