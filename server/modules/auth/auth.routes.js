const express = require('express');
const { registerUser, loginUser } = require('./auth.controller');

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route (new)
router.post('/login', loginUser);

module.exports = router;
