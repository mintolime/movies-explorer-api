const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { handleSucsessResponse } = require('../utils/handleSucsessResponse');

const BadRequest = require('../utils/errors/BadRequest');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'SECRET_KEY',
        { expiresIn: '7d' },
      );
      res
        .send({ token, email });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      const userData = {
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      };
      return handleSucsessResponse(res, 201, userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Данный пользователь уже создан'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные '));
      } else {
        next(err);
      }
    });
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return handleSucsessResponse(res, 200, user);
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      return next(err);
    });
};

const updateUserData = (req, res, next, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return handleSucsessResponse(res, 200, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const userData = {
    name: req.body.name,
  };
  updateUserData(req, res, next, userData);
};

module.exports = {
  login, createUser, getUserProfile, updateUserProfile,
};
