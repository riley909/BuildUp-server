const express = require('express');
const router = express.Router();

const create = require('../Controllers/Achievment/create');
const info = require('../Controllers/Achievment/info');
const update = require('../Controllers/Achievment/update');

const auth = require('../middleware/auth');

router.get('/info', auth, info);
router.post('/create', auth, create);
router.post('/update', auth, update)


module.exports = router;