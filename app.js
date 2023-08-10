const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UsersRouter = require('./routes/users');
const CardsRouter = require('./routes/cards');

const auth = require('./middlewares/auth');

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

// app.use((req, res, next) => {
//   req.user = {
//     _id: '64d548b08c3477f930061b8f',
//   };
//   next();
// });

const {
  login,
  createUser,
} = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

// app.use('/users', require('./routes/users'));
app.use(UsersRouter);
app.use(CardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: 'Не найдено' }));
