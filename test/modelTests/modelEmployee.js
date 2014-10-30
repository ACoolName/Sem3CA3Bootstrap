var should = require('should');
var beforeTest = require('./beforeTest');
var Employee = require('../../models/employee');

describe('Employee Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all employees', function (done) {
            Employee.all(function (err, e) {
                e.length.should.equal(2);
                done();
            });
        })
    });
    describe('get', function () {
        it('Should return one employee  when using valid id',
            function (done) {
                Employee.get(1, function (err, e) {
                    should.exist(e);
                    done();
                });
            }
        );
        it('Should return null when using invalid id',
            function (done) {
                Employee.get(0, function (err, e) {
                    should.not.exist(e);
                    done();
                });
            }
        )
    });
});