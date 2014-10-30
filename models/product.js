var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Product = mongoose.model('products');

module.exports = {
    getAllProducts: abs.createFindFunc(Product),
    getProduct: abs.createFindOneFunc(Product)
}