const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog.js');

mongoose
  .connect(config.MONGODB_URI, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('mongodb connected');
  })
  .catch((error) => {
    logger.error(`Failed to connect ${error}`);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
