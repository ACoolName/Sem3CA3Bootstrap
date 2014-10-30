var should = require('should');
var beforeTest = require('./beforeTest');
var Employee = require('../../models/employee');

describe('Employee Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all employees', function (done) {
            Employee.getAllEmployees(function (err, e) {
                e.length.should.equal(2);
                console.log(e[0].employeeId);
                done();
            });
        })
    });
});