var abs = require('./abstractSearch');
var model = require('../database/model');
var Customer = model.CustomerModel;

module.exports = abs.createExportObject(Customer);
