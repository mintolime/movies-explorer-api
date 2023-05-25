const { INTERNAL_SERVER_ERROR } = require('../utils/constants/errorsMessage');

const handleErrors = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? INTERNAL_SERVER_ERROR
        : message,
    });
  next();
};

module.exports = { handleErrors };
