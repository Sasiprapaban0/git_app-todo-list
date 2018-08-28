var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
    mongoose.set('debug',config.debug);
    var db = mongoose.connect(config.mongoUri,{ useNewUrlParser: true});
    //===routes
    require('../app/models/todo.model');
    return db;
};