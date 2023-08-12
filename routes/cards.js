const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/(https?:)\/\/([\w\S]{1,})/),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), putLike);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), deleteLike);

module.exports = router;
