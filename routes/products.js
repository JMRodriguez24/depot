
/* 
 *  routes for products
 */         

module.exports = function (app, models) {
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

        // get a specific product
        app.get('/', function (req, res) {
            res.render('products/show', { product: req.product });            
        });

        // show a specific product
        app.get('/edit', function (req, res) {
            console.dir(req.product);
            res.render('products/edit', { product: req.product });
        });

        // delete a specific product
        app.del('/', function (req, res) {
            Product.remove(req.product._id, function  (err, product) {
                res.redirect('/products/');
            });
        });
    });
};
