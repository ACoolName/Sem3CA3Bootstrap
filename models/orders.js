var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Order = mongoose.model('orders');

module.exports = abs.createExportObject(Order);
// {
//     getAllOrders: abs.createFindFunc(Order),
//     getOrder: abs.createFindOneFunc(Order),
//     updateOrder: abs.createUpdateFunc(Order)
// }
