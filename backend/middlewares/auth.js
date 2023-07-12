/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const JWT_SECRET = 'some-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Нет доступа');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError('Неправильный логин или пароль'));
  }

  req.user = payload;

  return next();
};
