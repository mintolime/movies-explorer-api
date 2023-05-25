const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const { NO_AUTH_MESSAGE } = require('../utils/constants/errorsMessage');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const auth = (req, res, next) => {
  // тут будет вся авторизация
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(NO_AUTH_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(NO_AUTH_MESSAGE));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = { auth };
