const logger = require('../utils/logger')('errorHandler');

const defaultErrorHandler = (error, req, res, next) => {
  logger.log('error', `${error.name}:${error.status} - ${error.message}`);
  res.status(error.status).send({ error: error.message });
};

export default defaultErrorHandler;
