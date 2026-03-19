const { ApiError } = require('./ApiError');

class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

module.exports = { NotFoundError };
