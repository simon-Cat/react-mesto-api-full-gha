const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { validateSignin, validateSignup } = require('./utils/requestValidation');
const { cards, users } = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log('BD Access!'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.post('/signin', validateSignin(), login);

app.post('/signup', validateSignup(), createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.use(errorLogger);

// celebrate error handler
app.use(errors());

// incorrect route error handler
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// centralized error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
