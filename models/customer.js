var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Customer = mongoose.model('customers');

module.exports = {
    getAllCustomers: abs.createSearchAllFunc(Customer),
    getCustomer: abs.createSearchOneWithIdFunc(Customer)
}