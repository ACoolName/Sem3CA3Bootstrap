var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Order = mongoose.model('orders');

module.exports = abs.createExportObject(Order);
