const usersRouter = require('express').Router();

const {
  getUserProfile, updateUserProfile,
} = require('../controllers/users');
const { updateProfileUserValidation } = require('../validation/validation');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', getUserProfile);
// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', updateProfileUserValidation, updateUserProfile);

module.exports = usersRouter;
