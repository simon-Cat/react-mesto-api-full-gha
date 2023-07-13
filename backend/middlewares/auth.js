const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload = null;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new AuthorizationError('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      next(new AuthorizationError('Необходима авторизация'));
    } else {
      next(e);
    }
  }

  req.user = payload;

  return next();
};
