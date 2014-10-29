var mongoose = require('mongoose');
var abs = require('./abstractSearch');
var Employee = mongoose.model('employees');

module.exports = {
    getAllEmployees: abs.createFindFunc(Employee),
    getEmployee: abs.createFindOneFunc(Employee)
}