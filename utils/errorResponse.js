class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    //super calls the constructor of the super class (Error).
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;