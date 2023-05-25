const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const User = require('../models/user');
const { handleSucsessResponse } = require('../utils/constants/handleSucsessResponse');

const BadRequest = require('../utils/errors/BadRequest');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');

const {
  DOUBLE_USER_MESSAGE, DOUBLE_EMAIL_MESSAGE, BAD_REQUEST, USER_NOT_FOUND_MESSAGE,
} = require('../utils/constants/errorsMessage');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .send({ token, email });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      const userData = {
        name: newUser.name,
        email: newUser.email,
      };
      return handleSucsessResponse(res, 201, userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(DOUBLE_USER_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
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
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(BAD_REQUEST));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findByIdAndUpdate(req.user._id, userData, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      return handleSucsessResponse(res, 200, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictError(DOUBLE_EMAIL_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login, createUser, getUserProfile, updateUserProfile,
};
