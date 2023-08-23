const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const UsersRouter = require('./routes/users');
const CardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-error');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const {
  signinValidation,
  signupValidation,
} = require('./middlewares/celebrate-validation');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {
  login,
  createUser,
} = require('./controllers/users');

app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(auth);

app.use(UsersRouter);
app.use(CardsRouter);
app.use('*', (req, res, next) => next(new NotFoundError('Не найдено')));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
