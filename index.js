const express = require('express');
require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./Routes/index');
const userRouter = require('./Routes/user');
const photoRouter = require('./Routes/photo');
const todoRouter = require('./Routes/todo');
const achievmentRouter = require('./Routes/achievment');

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

app.use('/', indexRouter);
app.use('/user', userRouter); //user에관한 요청시 가는 곳
app.use('/photo', photoRouter); //PHOTO에관한 요청시 가는 곳
app.use('/todo', todoRouter);
app.use('/achievment', achievmentRouter);

app.use('/', (req, res) => {
  res.send('hello bulid up!!');
});

let server;
const PORT = 4000;
const options = {
  ca: fs.readFileSync(`/etc/letsencrypt/live/www.build-up-v.tk/fullchain.pem`),
  key: fs.readFileSync(`/etc/letsencrypt/live/www.build-up-v.tk/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/www.build-up-v.tk/cert.pem`),
};

http.createServer(app).listen(PORT);
https.createServer(options, app).listen(443, () => {
  console.log(`🚀 HTTPS Server listening on port 443`);
});
server = app.listen(PORT, () => {
  console.log('server on 4000');
});

module.exports = server;
