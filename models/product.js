var abs = require('./abstractSearch');
var CustomFunction = require('../Objects/CustomFunction');
var mongoose = require('mongoose');
var Product = mongoose.model('products');

module.exports = abs.createExportObject(Product,
    [new CustomFunction(false, "categoryId", "getAllByCategoryId")]);
