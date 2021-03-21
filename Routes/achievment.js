const express = require('express');
const router = express.Router();

const create = require('../Controllers/Achievment/create');
const info = require('../Controllers/Achievment/info');

router.get('/info', info);
router.post('/create', create);


module.exports = router;