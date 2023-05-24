const usersRouter = require('express').Router();

const {
  getUserProfile, updateUserProfile,
} = require('../controllers/users');
const { updateProfileUserValidation, userIdValidation } = require('../validation/validation');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', userIdValidation, getUserProfile);
// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', updateProfileUserValidation, updateUserProfile);

module.exports = usersRouter;
