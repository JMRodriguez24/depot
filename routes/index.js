
/*
 * routes for the home page.
 */

module.exports = function(app){
    app.get('/', function (req, res) {        
        res.render('index', { title: 'depot' });
    });

    require('./products')(app);
};
