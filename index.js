const express = require('express');
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require('morgan');

const user = require('./routes/user');    // 라우터 에서 가져오는 코드 
const photo = require('./routes/photo');   // 

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["https://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
);
ㄷ
let server;

// app.use('/', indexRouter);
app.use('/user', user);    //user에관한 요청시 가는 곳 
app.use('/photo', photo);    //PHOTO에관한 요청시 가는 곳 


app.use('/', (req, res) => {
    res.send("hello bulid up!!");
})

server = app.listen(4000, () => {
    console.log('server on 4000');
})

module.exports = server;