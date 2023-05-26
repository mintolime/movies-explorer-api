const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { NO_LOGIN_MESSAGE } = require('../utils/constants/errorsMessage');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  email: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    select: false,
  },
}, { versionKey: false }); // для скрытия версий в момент создания

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(NO_LOGIN_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(NO_LOGIN_MESSAGE);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
