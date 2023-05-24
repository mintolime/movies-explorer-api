const appAuth = require('express').Router();

const { login, createUser } = require('../controllers/users');
const { validationAuthorization, validationLogin } = require('../validation/validation');

appAuth.post('/signup', validationAuthorization, createUser);
appAuth.post('/signin', validationLogin, login);

module.exports = appAuth;
