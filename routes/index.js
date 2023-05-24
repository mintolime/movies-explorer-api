const router = require('express').Router();

const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
module.exports = router;
