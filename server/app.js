//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
// https://expressjs.com/en/advanced/best-practice-performance.html
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('routes.js');
/*TODO require logging tools, compression?
var log4js = require("log4js");
var morgan = require("morgan");
var compression = require('compression')*/

var express = require('express');
var app = express();

//app.use(bodyParser.json());

let ohHi = function() {
  return 'Server says oh Hi';
};

// might break, should be a file to server
//app.use('/', ohHi);
//app.use(function)
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/', function(req, res, next) {
  res.send('hi there');
  console.log('hi there console');
});






module.exports = app;