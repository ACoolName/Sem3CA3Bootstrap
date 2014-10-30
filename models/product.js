var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Product = mongoose.model('products');

module.exports = abs.createExportObject(Product);
