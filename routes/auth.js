const appAuth = require('express').Router();
const { login, createUser } = require('../controllers/users');
// const { validationAuthorization, validationLogin } = require('../validation/validation');
// ok
appAuth.post('/signup', createUser);
appAuth.post('/signin', login);

module.exports = appAuth;
