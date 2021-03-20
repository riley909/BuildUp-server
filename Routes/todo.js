const express = require('express');
const router = express.Router();

const todoCreate = require('../Controllers/Todo/create');
const todoInfo = require('../Controllers/Todo/info');
const todoRemove = require('../Controllers/Todo/remove');
const todoUpdate = require('../Controllers/Todo/update');

router.post('/create', todoCreate);
router.post('/update', todoUpdate);
router.post('/remove', todoRemove);
router.get('/info', todoInfo);

module.exports = router;
