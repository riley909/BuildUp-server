const express = require('express');
const router = express.Router();

const userLogin = require('../Controllers/User/login');
const userLogout = require('../Controllers/User/logout');
const userSignup = require('../Controllers/User/signup');
const userInfo = require('../Controllers/User/userInfo');
const refreshTokenRequest = require('../Controllers/User/refreshTokenRequest');

const auth = require('../middleware/auth');

router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/signup', userSignup);
router.get('/info', auth, userInfo);
router.get('/refreshtokenrequest', refreshTokenRequest);

module.exports = router;
