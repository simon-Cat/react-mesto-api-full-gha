const { NODE_ENV, JWT_SECRET } = process.env;
const { Error } = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь с id ${userId}с не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.getMeInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь с id ${userId}с не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(201).send({
          data: {
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с такими данными уже существует'));
        } else {
          next(err);
        }
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports.updateUserData = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findById(userId)
    .orFail()
    .then((user) => {
      user.updateOne({ name, about }, { new: true, runValidators: true })
        .then(() => {
          res.send({ name, about });
        });
    })
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь с id ${userId}с не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findById(userId)
    .orFail()
    .then((user) => {
      user.updateOne({ avatar }, { new: true, runValidators: true })
        .then(() => {
          res.send({ avatar });
        });
    })
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь с id ${userId}с не найден`));
      } else {
        next(err);
      }
    });
};
