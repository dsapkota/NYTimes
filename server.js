var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var logger = require('morgan');
var production = require('dotenv').config()


var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(process.cwd() + '/public'));


if(process.env.NODE_ENV == 'production'){
  mongoose.connect('mongodb://heroku_dcjvjz77:j3ib7vj9vjtp2v3a911h13sf8q@ds117485.mlab.com:17485/heroku_dcjvjz77');
}
else{
  mongoose.connect('mongodb://localhost/nytreact');
}
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var Article = require('./models/Article.js');

var router = require('./controllers/controller.js');
app.use('/', router);

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});
