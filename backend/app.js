/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { createUser, login } = require('./controllers/users');
const { validationSignup, validationSignin } = require('./middlewares/validation');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Подключение к БД - успешно');
});

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validationSignup, createUser);
app.post('/signin', validationSignin, login);

app.use(auth);
app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Порт сервера 3000');
});
