const express = require('express');
const router= express.Router();
const {addColor,getAllColor} = require('../controller/colors');

//bodypart routes
router.post('/add',addColor);
router.get('/',getAllColor);

module.exports = router;