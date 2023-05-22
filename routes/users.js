const usersRouter = require('express').Router();

const {
  getUserProfile, updateUserProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', getUserProfile);
// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', updateUserProfile);

module.exports = usersRouter;
