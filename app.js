const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UsersRouter = require('./routes/users');
const CardsRouter = require('./routes/cards');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})

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
