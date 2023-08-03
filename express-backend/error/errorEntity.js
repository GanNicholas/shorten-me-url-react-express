class ErrorEntity {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }

  static badRequest(msg) {
    return new ErrorEntity(400, msg);
  }

  static internalServerError(msg) {
    return new ErrorEntity(500, msg);
  }

  static unauthorized(msg) {
    return new ErrorEntity(401, msg);
  }

  static forbidden(msg) {
    return new ErrorEntity(403, msg);
  }

  static notFound(msg) {
    return new ErrorEntity(404, msg);
  }

  static unsupportedMediaType(msg) {
    return new ErrorEntity(415, msg);
  }
}

module.exports = ErrorEntity;
