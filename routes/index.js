
/*
 * routes for the home page.
 */

var models = require('../models');

module.exports = function(app){

    app.get('/', function (req, res) {        
        res.render('index', { title: 'depot' });
    });

    require('./products')(app, models);
};
