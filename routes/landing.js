var express = require('express');
var Request = require("request");
var fs = require("fs");
var dateFormat = require('dateformat');
var Itineary = require('../Database/models/Itineary')
var router = express.Router();

// var trip=[
//     {id:1, dur:'3 night',tript:'Experience True and Authentic Greece', auth:'By Ryan Shirley', tripp:'1256', tripc:'AED',origin:"SFO",Destination:"LAX"}
// ];

router.get('/', function (req, res) {
    Itineary.find({}, (err, itineary )=> {
        if (err) {
            console.log("cannot find an itneary!!! ... some error occcured!!", err)
        }
        else {
            console.log(JSON.stringify(itineary))
            res.render('home', {
                items: itineary
            });
        }
    })

});

module.exports = router;