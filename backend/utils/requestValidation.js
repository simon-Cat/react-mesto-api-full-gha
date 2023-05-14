const { celebrate, Segments, Joi } = require('celebrate');
const urlRegexp = require('./urlRegexp');

// Signin
module.exports.validateSignin = () => celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// Signup
module.exports.validateSignup = () => celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegexp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// Cards
module.exports.validateCreateCard = () => celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegexp),
  }),
});

module.exports.validateSetLikeToCard = () => celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
});

module.exports.validateRemoveLikeFromCard = () => celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
});

module.exports.validateRemoveCard = () => celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
});

// Users
module.exports.validateGetUser = () => celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
});

module.exports.validateUpdateUserInfo = () => celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUpdateUserAvatar = () => celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegexp),
  }),
});
