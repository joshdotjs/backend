class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// ==============================================

class ValidationError extends Error {
  constructor(message) {
    super(message);
  }
}

// ==============================================

module.exports = {
  HttpError,
  ValidationError
};