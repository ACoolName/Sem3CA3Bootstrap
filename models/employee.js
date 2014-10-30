var mongoose = require('mongoose');
var abs = require('./abstractSearch');
var Employee = mongoose.model('employees');

module.exports = abs.createExportObject(Employee);