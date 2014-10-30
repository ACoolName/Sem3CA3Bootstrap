var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Customer = mongoose.model('customers');

module.exports = abs.createExportObject(Customer);
