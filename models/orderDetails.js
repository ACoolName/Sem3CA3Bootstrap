var mongoose = require('mongoose');
var abs = require('./abstractSearch');
var OrderDetails = mongoose.model('orderdetails');

module.exports = {
    getAllOrderDetails: abs.createFindFunc(OrderDetails),
    getOrderDetailsByOrderId: abs.createFindFunc(OrderDetails, "orderId")
}