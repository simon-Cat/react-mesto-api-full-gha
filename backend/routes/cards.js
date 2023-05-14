const cards = require('express').Router();
const {
  validateCreateCard, validateSetLikeToCard, validateRemoveLikeFromCard, validateRemoveCard,
} = require('../utils/requestValidation');
const {
  getCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);

cards.post('/', validateCreateCard(), createCard);

cards.put('/:cardId/likes', validateSetLikeToCard(), likeCard);

cards.delete('/:cardId', validateRemoveCard(), removeCard);

cards.delete('/:cardId/likes', validateRemoveLikeFromCard(), dislikeCard);

module.exports = cards;
