const express = require('express');
require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./Routes/index');
const userRouter = require('./Routes/user');
const photoRouter = require('./Routes/photo');
const todoRouter = require('./Routes/todo');

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://build-up-v.tk'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

let server;

app.use('/', indexRouter);
app.use('/user', userRouter); //user에관한 요청시 가는 곳
app.use('/photo', photoRouter); //PHOTO에관한 요청시 가는 곳
app.use('/todo', todoRouter);

app.use('/', (req, res) => {
  res.send('hello bulid up!!');
});

server = app.listen(4000, () => {
  console.log('server on 4000');
});

module.exports = server;
