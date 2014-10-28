var mongoose = require('mongoose');
var abs = require('./abstractSearch');
var OrderDetails = mongoose.model('orderdetails');

module.exports = {
    getAllOrderDetails: abs.createSearchAllFunc(OrderDetails),
    getOrderDetailsByOrderId: abs.createSearchSeveralFunc(OrderDetails, "orderId")
}