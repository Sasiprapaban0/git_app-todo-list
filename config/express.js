var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass    = require('node-sass-middleware');
var session = require('express-session');
var config  = require('./config');
// var path = require('path');

module.exports = function(){
    var app = express();

    //Body Passer Middleware
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));
   // parse application/json
    app.use(bodyParser.json());

  // Load View Engine
    //app.set('views', './app/views');
    app.set('views', './app/views');
    app.set('view engine', 'jade');


    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else {
        app.use(compression);
    }

  
    //====routes====
    require('../app/routes/index.routes')(app);
    require('../app/routes/todo.routes')(app);

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    }))
    // call use static file 
    app.use(sass({
        src:'./sass',
        dest:'./public/css',
        outputStyle: 'compressed',
        prefix:'/css'
    }));
    //app.use(require('less-middleware')({ src: __dirname + '/public', compress: true }));
    //app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('./public'));
    return app;
}