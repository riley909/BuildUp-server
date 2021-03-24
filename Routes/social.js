const express = require('express');
const router = express.Router();

const googleController = require('../Controllers/Social/auth');

router.post('/googlelogin', googleController);

module.exports = router;
