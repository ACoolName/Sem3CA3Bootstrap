var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Order = mongoose.model('orders');
var CustomFunction = require('../Objects/CustomFunction');

module.exports = abs.createExportObject(Order,
    [new CustomFunction(false, "customerId","getAllByCustomerId")]);
