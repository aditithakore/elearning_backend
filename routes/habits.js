const express = require('express');
const router= express.Router();
const {addHabit,getAllHabit} = require('../controller/habits');

//alphabet routes
router.post('/add',addHabit);
router.get('/',getAllHabit);

module.exports = router;