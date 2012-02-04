
/**
 * Module dependencies.
 */

var express = require('express');
require('express-namespace');
var mongoose = require('mongoose');
var messages = require('./lib/alert');
var stylus = require('stylus');
var publicDir = __dirname + '/public';

var app = module.exports = express.createServer();

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());      
    app.use(express.cookieParser());
    app.use(express.session({ secret: "keyboard cat" }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express['static'](publicDir));
    app.use(stylus.middleware({ src: publicDir }));
    app.dynamicHelpers({ messages: messages });
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    app.set('connectionString', 'mongodb://localhost:27017/depot');
});

app.configure('production', function () { 
    app.use(express.errorHandler()); 
    app.set(process.env.MONGOHQ_URL);
});

// Routes
require('./routes')(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

