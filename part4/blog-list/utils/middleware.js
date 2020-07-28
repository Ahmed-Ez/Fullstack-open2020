const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method', req.method);
  logger.info('Path', req.path);
  logger.info('Body', req.body);
  logger.info('---');
  next();
};

const unknownEndPoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
};