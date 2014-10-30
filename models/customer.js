var abs = require('./abstractSearch');
var Customer = mongoose.model('customers');

module.exports = abs.createExportObject(Customer);
