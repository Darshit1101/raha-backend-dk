const express = require('express');
const router = express.Router();
const Ctrl = require('../controller/user');

router.post('/register', Ctrl.registerUser);
router.post('/login', Ctrl.loginUser);

module.exports = router;
