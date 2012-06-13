
/* 
 *  routes for cart
 */         

module.exports = function (app, models) {
    var model = models.product(app);

    app.post('/add_to_cart/:id', function (req, res) {
        req.session.cartItems = req.session.cartItems || [];
        model.findById(req.params.id, function  (err, product) {
            var i;
            var exists;

            if (!err) {
                for (i = 0; i < req.session.cartItems.length; i++) {
                    if (req.session.cartItems[i].product._id == product._id) {
                        req.session.cartItems[i].count++; 
                        exists = true;
                    } 
                }
                
                
                if (!exists) {
                    req.session.cartItems.push({
                        count: 1,
                        "product": product
                    });
                }                  

                res.redirect('/cart');
            }
            else {
                req.flash('error', app.__i('Unable to add product to cart.  Does that product exist?'));
                res.redirect('back');
            }
        });
    });

    app.get('/cart', function (req, res) {
        res.render('cart', { items : req.session.cartItems });
    });
};    
