
/* 
 *  routes for products
 */         

module.exports = function (app) {
    var models = require('../models');
    var Product = new models.Product(app);

    // get a list of products
    app.get('/products/', function (req, res) {
        Product.findAll( function  (err, products) {
            res.render('products', { count: products.length, products: products });
        });
    });

    // Add a new product
    app.get('/products/add/', function (req, res) {
        res.render('products/add', { product: {} });
    });

    // Save a product
    app.post('/products', function  (req, res) {
        Product.save(req.body.product, function  (err) {
            if(!err) {
                res.redirect('/products/');
            }

        }); 
    });

    app.namespace('/products/:id', function () {
 
        // Route param precondition to load a product
        app.param('id', function (req, res, next, id) {
            Product.findById(id, function (err, product) {
                if (err) {
                   return next(err);
                }

                if (!product) {
                    return next(new Error('failed to find product'));
                }

                req.product = product;
                next();
            });    
        });

        // get a specific post
        app.get('/', function (req, res) {
            res.render('products', req.product);            
        });

        // delete a specific post
        app.del('/', function (req, res) {
            res.redirect('/products/');
        });
    });
};
