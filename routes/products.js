
/* 
 *  routes for products
 */         

module.exports = function (app, models) {
    var product = models.product(app);
    
    function handleValidationErrors(err, req, res, redirect, infoMsg) {
        if (err) {
            var errors = err.errors;
            var error;

            for (error in errors)
            {
                if (errors.hasOwnProperty(error))
                {
                    req.flash('error', errors[error].message);
                }
            }

            res.redirect(redirect);
        }
        else {
            req.flash('info', infoMsg);
            res.redirect('/products/');
        }
    }

    // get a list of products
    app.get('/products/', function (req, res) {
        product.findAll(function  (err, products) {
            res.render('products', { count: products.length, products: products });
        });
    });

    // Add a new product
    app.get('/products/add/', function (req, res) {
        res.render('products/add', { product: {} });
    });

    // Save a product
    app.post('/products', function  (req, res) {
        product.save(req.body.product, function  (err) {
            var product = req.body.product;
            handleValidationErrors(err, req, res, '/products/add/', product.title + ' saved successfully');
        }); 
    });

    app.namespace('/products/:id', function () {

        // Route param precondition to load a product
        app.param('id', function (req, res, next, id) {
            product.findById(id, function (err, product) {
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

        // show a form to modify a product
        app.get('/edit', function (req, res) {
            res.render('products/edit', { product: req.product });
        });

        // update a product
        app.post('/edit', function (req, res) {
            product.update(req.product, req.body.product, function (err) {
                var body = req.product;
                handleValidationErrors(err, req, res, '/products/' + body._id + '/edit', 'Updated ' + body.title);
            });
        });

        // delete a specific product
        app.del('/', function (req, res) {
            product.remove(req.product._id, function  (err, count) {
                handleValidationErrors(err, req, res, '/products/', req.product.title + ' was deleted');     
            });
        });
    });
};
