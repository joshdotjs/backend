class HttpError extends Error {
  constructor(message, status, info=null) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

// ==============================================

class DatabaseError extends Error {
  constructor(message, info=null) {
    super(message);
    this.info = info;
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
  DatabaseError,
  ValidationError
};