var mongoose = require('mongoose');
var product;

function ProductProvider(app) {
    mongoose.connect(app.set('connectionString'));
    
    var Schema = mongoose.Schema;

    var ProductSchema = new Schema ({
        title : String,
        description: String,
        image_url : String,
        price : Number
    });

    mongoose.model('Product', ProductSchema);
    product = mongoose.model('Product');
}

// Find all products
ProductProvider.prototype.findAll = function(callback) {
    product.find({}, function (err, products) {
        callback(null, products);
    });  
};

// Find product by ID
ProductProvider.prototype.findById = function(id, callback) {
    product.findById(id, function (err, product) {
        if (!err) {
            callback(null, product);
        }
        else {
            callback(err, null);
        }
    });
};

// Update product by ID
ProductProvider.prototype.updateById = function(id, body, callback) {
    product.findById(id, function (err, product) {
        if (!err) {
            product.title = body.title;
            product.body = body.description;
            product.image_url = body.image_url;
            product.price = body.price;
            product.save(function (err) {
                callback();
            });
        }
    });
};

// Create a new product
ProductProvider.prototype.save = function(body, callback) {
    var model = new product(body);
    model.save(function (err) {
        callback(err);
    });
};

ProductProvider.prototype.remove = function(id, callback) {
    product.remove({ _id: id }, function (err,  count) {
       callback(err, count);  
    }); 
};

exports.ProductProvider = ProductProvider;
