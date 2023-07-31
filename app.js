const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UsersRouter = require('./routes/users');
const CardsRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT);

app.use((req, res, next) => {
  req.user = {
    _id: '64c4e09204e30872166145a7',
  };
  next();
});
app.use(UsersRouter);
app.use(CardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: 'Не найдено' }));
