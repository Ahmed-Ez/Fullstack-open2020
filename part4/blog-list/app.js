const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog.js');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');

mongoose
  .connect(config.MONGODB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
