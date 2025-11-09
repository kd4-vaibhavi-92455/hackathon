const createResult = require("./result");

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error stack for debugging
  const message = err.message || 'Internal Server Error'; // Determine error message
  res.send(createResult(message, null));
}

module.exports = errorHandler;
