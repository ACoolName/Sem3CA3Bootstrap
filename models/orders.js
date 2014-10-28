var mongoose = require('mongoose');
var Order = mongoose.model('orders');

function getAllOrders(callback) {
    Order.find({}, function (err, orders) {
        if (err) {
            return callback(err);
        }
        callback(null, orders);
    });
}

module.exports = {
    getAllOrders: getAllOrders
}