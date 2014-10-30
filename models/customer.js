var abs = require('./abstractSearch');
var model = require('../database/model');
var Customer = model.CustomerModel;

module.exports = {
    getAllCustomers: abs.createFindFunc(Customer),
    getCustomer: abs.createFindOneFunc(Customer)
};