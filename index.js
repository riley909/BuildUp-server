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
const certPath = `/etc/letsencrypt/live/www.build-up-v.tk`;

if (fs.existsSync(`${certPath}/privkey.pem`) && fs.existsSync(`${certPath}/cert.pem`)) {
  const privateKey = fs.readFileSync(__dirname + `/privkey.pem`, `utf-8`);
  const certificate = fs.readFileSync(__dirname + `/cert.pem`, `utf-8`);
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log(`🚀 HTTPS Server listening on port ${PORT}`));
} else {
  server = app.listen(PORT, () => {
    console.log('server on 4000');
  });
}

module.exports = server;
