const express = require('express');
const router= express.Router();
const {addBodypart,getAllBodyparts} = require('../controller/bodypart');

//bodypart routes
router.post('/add',addBodypart);
router.get('/',getAllBodyparts);

module.exports = router;