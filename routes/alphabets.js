const express = require('express');
const router= express.Router();
const {addAlphabet,getAllAlphabet} = require('../controller/alphabets');

//alphabet routes
router.post('/add',addAlphabet);
router.get('/',getAllAlphabet);

module.exports = router;