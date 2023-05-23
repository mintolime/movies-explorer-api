const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
// const appAuth = require('./routes/auth');
// const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/constants/limiter');
const NotFoundError = require('./utils/errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/moviedb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
// функционал работы роутеров
// app.use(appAuth);
// защита всех роутеров авторизацией
// app.use(auth);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use((req, res, next) => { next(new NotFoundError('Такой страницы не существует')); });

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // центральный обработчик ошибок

app.listen(PORT, () => { console.log(`Server working, your port ${PORT}`); });
