
var exports = module.exports = function (app) {
    var mongoose = require('mongoose');
    var product;
    
    mongoose.connect(app.set('connectionString'));

    var Schema = mongoose.Schema;

    var ProductSchema = new Schema({
        title : { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image_url : { type: String, required: true, match: /\.(gif|jpg|png)/i },
        price : { type: Number, min: 0.01 }
    });

    mongoose.model('Product', ProductSchema);
    product = mongoose.model('Product');

    return {
        // Find all products
        findAll: function (callback) {
            product.find({}, function (err, products) {
                callback(null, products);
            });  
        },
        // Find product by ID
        findById: function (id, callback) {
            product.findById(id, function (err, product) {
                if (!err) {
                    callback(null, product);
                }
                else {
                    callback(err, null);
                }                
            });
        },
        findByIds: function (ids, callback) {
            product.where('_id')['in'](ids).run(function (err, products) {
                if (!err) {
                    callback(null, products);
                }
                else {
                    callback(err, null);    
                }
            });
        },
        // Update product by ID
        update: function (product, body, callback) {
            product.title = body.title;
            product.description = body.description;
            product.image_url = body.image_url;
            product.price = body.price;
            product.save(function (err) {
                callback(err);
            });
        },
        // Create a new product
        save: function (body, callback) {
            var model = new product(body);
            model.save(function (err) {
                callback(err);
            });
        },
        // Delete product
        remove: function (id, callback) {
            product.remove({ _id: id }, function (err,  count) {
                callback(err, count);  
            }); 
        }
    };
};
