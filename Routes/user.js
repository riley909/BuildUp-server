const express = require('express');
const router = express.Router();

const userLogin = require('../Controllers/User/login');
const userLogout = require('../Controllers/User/logout');
const userSignup = require('../Controllers/User/signup');
const userInfo = require('../Controllers/User/userinfo');
const accessTokenRequest = require('../Controllers/User/accessTokenRequest');
const refreshTokenRequest = require('../Controllers/User/refreshTokenRequest');

router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/signup', userSignup);
router.get('/info', userInfo);
router.get('/accesstokenrequest', accessTokenRequest);
router.get('/refreshtokenrequest', refreshTokenRequest);

module.exports = router;
