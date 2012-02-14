
/**
 * Module dependencies.
 */

var express = require('express');
require('express-namespace');
var mongoose = require('mongoose');
var helpers = require('./helpers');
var i18n = require('i18n');
var publicDir = __dirname + '/public';

var app = module.exports = express.createServer();

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());      
    app.use(express.cookieParser());
    app.use(express.session({ secret: "AwesomeDepotApp" }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express['static'](publicDir));
    app.use(i18n.init);
    app.dynamicHelpers({ messages: helpers.messages });
    app.helpers({
        numbers: helpers.numbers,
        __i: i18n.__,
        __n: i18n.__n
    });
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

