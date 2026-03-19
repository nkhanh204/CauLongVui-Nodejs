const { ApiError } = require('../exceptions/ApiError');
const { sendResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  if (!(err instanceof ApiError) && !statusCode) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  // Log error
  console.error(err);

  return sendResponse(res, statusCode || 500, false, message, null, err.stack);
};

module.exports = errorMiddleware;
