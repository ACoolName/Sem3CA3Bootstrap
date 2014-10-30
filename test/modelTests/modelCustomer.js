var should = require('should');
var beforeTest = require('./beforeTest');
var Customer = require('../../models/customer');

describe('Customer Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all customers', function (done) {
            Customer.getAllCustomers(function (err, c) {
                c.length.should.equal(2);
                done();
            });
        })
    });

    describe('get', function () {
        it('Should return one customer',
            function (done) {
                Customer.getCustomer("ALFKI", function (err, c) {
                    should.exist(c);
                    done();
                });
            }
        );
        it('Should return null',
            function (done) {
                Customer.getCustomer(0, function (err, c) {
                    should.not.exist(c);
                    done();
                });
            }
        )
    });
});