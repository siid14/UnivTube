var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../middleware/auth');

router.post('/create', isLoggedIn , function(req,res, next){
        res.status(201).json(req.body)
    });



module.exports = router;