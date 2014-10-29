var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Order = mongoose.model('orders');

module.exports = {
    getAllOrders: abs.createFindFunc(Order),
    getOrder: abs.createFindOneFunc(Order)
}