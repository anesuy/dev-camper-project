const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next ) => {
  //Log to console for dev
  console.log(err.stack.red);
  let error = {...err}

 //Mongoose bad ObjectId 
  if (err.name ==='CastError') {
    //castError is returned when the Id which is used to make the request is not in the right format.
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404)
  }

  //Mongoose duplicate key (name, etc..)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 404)
  }

  //Mongoose validation error - POST ERROR
  if (err.code === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 404)
  }

  res.status(error.statusCode || 500).json({
    success: false, 
    error: error.message || 'Server Error'
  });
}

module.exports = errorHandler;