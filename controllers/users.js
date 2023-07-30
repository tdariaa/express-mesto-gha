const UserModel = require('../models/users');

module.exports.getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.getUser = (req, res) => {

  const { userId } = req.params;

  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному id не найден' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный id' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.createUser = (req, res) => {
  return UserModel.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.updateProfile = (req, res) => {

  const { name, about } = req.body;

  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному id не найден' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.updateAvatar = (req, res) => {
  return UserModel.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному id не найден' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};
