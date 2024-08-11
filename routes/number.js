const express = require('express');
const router= express.Router();
const {addNumber,getAllNumber} = require('../controller/number');

//bodypart routes
router.post('/add',addNumber);
router.get('/',getAllNumber);

module.exports = router;