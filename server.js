// set up ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose(); // return mongoose.connect(config.mongoUri);
var app = express();



// listen (start app with node server.js) ======================================
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000');