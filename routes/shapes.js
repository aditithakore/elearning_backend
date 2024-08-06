const express = require('express');
const router= express.Router();
const {addShape,getAllShape} = require('../controller/shapes');

//bodypart routes
router.post('/add',addShape);
router.get('/',getAllShape);

module.exports = router;