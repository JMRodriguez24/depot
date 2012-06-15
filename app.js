
/**
 * Module dependencies.
 */

var express = require('express');
var RedisStore = require('connect-redis')(express);
require('express-namespace');
var helpers = require('./helpers');
var i18n = require('i18n');
var publicDir = __dirname + '/public';
var port;
var redisClient;

var app = module.exports = express.createServer();
app.__i = i18n.__;
app.__n = i18n.__n;

// Heroku redistogo connection
app.configure('production', function () {
    var rtg = require('url').parse(process.env.REDISTOGO_URL);
    redisClient = require('redis').createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(':')[1]);
});

app.configure('development', function () {
    redisClient = require("redis").createClient();
});


// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());      
    app.use(express.cookieParser());
    app.use(express.session({
        secret: process.env.CLIENT_SECRET || "AwesomeDepotApp",
        maxAge: new Date().now + 7200000,
        store: new RedisStore({ client: redisClient })
    }));
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
    port = 3000;
});

app.configure('production', function () { 
    app.use(express.errorHandler()); 
    app.set('connectionString', process.env.MONGOLAB_URI);
    port = process.env.PORT;    
});

// Routes
require('./routes')(app);

app.listen(port || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

