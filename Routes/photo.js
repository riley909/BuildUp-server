const express = require('express');
const router = express.Router();

const photo = require('../Controllers/Photo/photo');

router.get('/photo', photo);

module.exports = router;