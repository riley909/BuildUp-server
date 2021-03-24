const express = require('express');
const router = express.Router();

const todoCreate = require('../Controllers/Todo/create');
const todoInfo = require('../Controllers/Todo/info');
const todoRemove = require('../Controllers/Todo/remove');
const todoUpdate = require('../Controllers/Todo/update');

const auth = require('../middleware/auth');

router.post('/create', auth, todoCreate);
router.put('/update', auth, todoUpdate);
router.delete('/remove', auth, todoRemove);
router.get('/info', auth, todoInfo);

module.exports = router;
