var express=require('express');
var moment = require('moment');
var Request = require("request");
var dateFormat = require('dateformat');
var router=express.Router();

router.get('/extrabook', function(req,res){
    res.render('extrabook');
    
    console.log(req.param('par'));
});
module.exports=router;