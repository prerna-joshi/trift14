var express=require('express');
var path=require('path');
var session = require('express-session');
const mongoose = require('mongoose')
var bodyParser=require('body-parser');
var moment = require('moment');
var app=express();

//connection to database
mongoose.connect("mongodb+srv://trift:trift@cluster0-nokdi.mongodb.net/thrift?retryWrites=true",{useNewUrlParser:true},(err,client)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("successfully connected to DB!!")  }    
})

//configure app
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.locals.moment = require('moment');

// middleware
app.use(session({secret:'triftsession'}));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

//define routes
app.use(require('./routes/landing'))
app.use(require('./routes/inforoute'))
app.use(require('./routes/flight'))
app.use(require('./routes/extraite'))

// server
app.listen(1337, function(){
    console.log('ready on port 1337');
});