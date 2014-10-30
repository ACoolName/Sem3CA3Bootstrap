var abs = require('./abstractSearch');
var mongoose = require('mongoose');
var Categories = mongoose.model('categories');

module.exports = abs.createExportObject(Categories);