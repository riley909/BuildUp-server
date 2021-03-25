const express = require('express');
const router = express.Router();

const socialController = require('../Controllers/Social/auth');

router.post('/googlelogin', socialController.googlelogin);

module.exports = router;
