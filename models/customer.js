var abs = require('./abstractSearch');
var mongoose = require('mongoose');
//var Customer = mongoose.model('customers');
var model = require('../database/model');
var Customer = model.CustomerModel;

module.exports = {
    getAllCustomers: abs.createFindFunc(Customer),
    getCustomer: abs.createFindOneFunc(Customer)
}