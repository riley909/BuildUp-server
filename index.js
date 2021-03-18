const express = require('express');
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require('morgan');


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

let server;

app.use('/', (req, res) => {
    res.send("hello bulid up!!");
})

server = app.listen(4000, () => {
    console.log('server on 4000');
})

module.exports = server;