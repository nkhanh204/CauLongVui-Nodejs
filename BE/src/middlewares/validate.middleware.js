const { BadRequestError } = require('../exceptions/BadRequestError');

const validate = (schema) => (req, res, next) => {
  console.log('BEFORE VAL:', { params: req.params });
  try {
    const validatedData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Assign back to req for typed data access in controllers if needed
    if (validatedData.body) req.body = validatedData.body;
    if (validatedData.query) req.query = validatedData.query;
    if (validatedData.params) req.params = validatedData.params;
    console.log('AFTER VAL:', { params: req.params });
    
    next();
  } catch (error) {
    console.error('Validation Error Details:', {
      hasErrors: !!error.errors,
      message: error.message,
      stack: error.stack
    });

    const errorMessage = error.errors 
      ? error.errors.map((details) => details.message).join(', ')
      : error.message;
    
    return next(new BadRequestError(errorMessage));
  }
};

module.exports = validate;
