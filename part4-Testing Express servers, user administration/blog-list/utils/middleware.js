const logger = require('./logger');
const jwt = require('jsonwebtoken');

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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const token = req.get('authorization');
  if (token && token.toLowerCase().startsWith('bearer'))
    req.token = token.substring(7);
  next();
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor,
};
