const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validationRegex = require('../utils/constants');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(validationRegex),
  }),
}), updateAvatar);

module.exports = router;
