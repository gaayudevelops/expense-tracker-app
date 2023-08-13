const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// Sign up => POST
router.post('/signup', userController.postSignUp);

module.exports = router;
