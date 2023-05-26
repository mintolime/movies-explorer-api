const router = require('express').Router();

const appAuth = require('./auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

// роутеры авторизации/регистрации
router.use(appAuth);
// защита всех роутеров авторизацией
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => { next(new NotFoundError('Такой страницы не существует')); });
module.exports = router;
