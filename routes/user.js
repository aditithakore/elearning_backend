// routes/user.js
const express = require('express');
const router = express.Router();
const { adduser, getuser, loginuser } = require('../controller/user');
const { addprogress, getprogress, getprogressofonemodule } = require('../controller/progress');
const verifyToken = require('../middleware/auth');

// User routes
router.post('/', adduser); // Register
router.post('/login', loginuser); // Login

// Protected routes
router.get('/', verifyToken, getuser); // Get user info

// Progress routes (protected)
router.post('/progress/:id', verifyToken, addprogress);
router.get('/progress/:id', verifyToken, getprogress);
router.get('/progress/:id/:module', verifyToken, getprogressofonemodule);

module.exports = router;
