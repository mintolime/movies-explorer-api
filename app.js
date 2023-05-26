const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');

const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/constants/limiter');
const { CONNECT_DB_PATH, PORT } = require('./config');

const app = express(router);

mongoose.connect(CONNECT_DB_PATH);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
// функционал работы роутеров
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // центральный обработчик ошибок

app.listen(PORT, () => { console.log(`Server working, your port ${PORT}`); });
