const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new BadRequestError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new BadRequestError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
