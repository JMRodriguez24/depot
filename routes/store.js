
/* 
 *  routes for store
 */         

module.exports = function (app, models) {
    var product = models.product(app);

    app.get('/store', function (req, res) {
        product.findAll(function (err, products) {
            if (!err) {
                res.render('store', { products: products });
            }
        });
    });
};    
