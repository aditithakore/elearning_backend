const express = require('express');
const router= express.Router();
const {adduser,getuser,loginuser} = require('../controller/user');
const {addprogress,getprogress,getprogressofonemodule} = require('../controller/progress');

//user routes
//register
router.post('/',adduser);
router.get('/:id',getuser);

//login
router.post('/login',loginuser);


//progress routes
router.post('/progress/:id',addprogress);
router.get('/progress/:id',getprogress);
router.get('/progress/:id/:moduleName',getprogressofonemodule);

module.exports = router;