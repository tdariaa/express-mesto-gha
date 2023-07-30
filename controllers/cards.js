const CardModel = require('../models/cards');

module.exports.getCards = (req, res) => {
  return CardModel.find()
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.createCard = (req, res) => {
  const _id = req.user._id;
  return CardModel.create({ ...req.body, owner: _id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      }
      return res.status(404).send({ message: ' Карточка с указанным id не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный id' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.putLike = (req, res) => {
  CardModel.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий id карточки' });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};

module.exports.deleteLike = (req, res) => {
  CardModel.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        if (!card) {
          return res.status(404).send({ message: 'Передан несуществующий id карточки' });
        }
        res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Передан несуществующий id карточки' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    })
};