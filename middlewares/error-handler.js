const { logger } = require('../config/logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error);
}

module.exports = { errorHandler };
