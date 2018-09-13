var express=require('express');
var Request = require("request");
var fs = require("fs");
var data=fs.readFileSync('routes/media/airport.json', 'utf8');
var words=JSON.parse(data);



var router=express.Router();


router.get('/info', function(req,res){
   
    res.render('info',{
        airport:words
        
    });
 });




 module.exports=router;