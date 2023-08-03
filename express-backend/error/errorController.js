const ErrorEntity = require("./errorEntity.js");

const processError = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ErrorEntity) {
    res.status(err.code).send(err.msg);
  } else {
    res
      .status(500)
      .send("Error processing your request. Please contact system admin.");
  }
};

module.exports = processError;
