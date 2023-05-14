const users = require('express').Router();
const { validateGetUser, validateUpdateUserInfo, validateUpdateUserAvatar } = require('../utils/requestValidation');
const {
  getUsers, getUser, updateUserData, updateUserAvatar, getMeInfo,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getMeInfo);
users.get('/:userId', validateGetUser(), getUser);

users.patch('/me', validateUpdateUserInfo(), updateUserData);

users.patch('/me/avatar', validateUpdateUserAvatar(), updateUserAvatar);

module.exports = users;
