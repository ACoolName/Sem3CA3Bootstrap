var mongoose = require('mongoose');
var abs = require('./abstractSearch');
var CustomFunction = require('../Objects/CustomFunction');
var OrderDetails = mongoose.model('orderdetails');

module.exports =  abs.createExportObject(OrderDetails,
    [new CustomFunction(false, "orderId", "getAllByOrderId")]);
