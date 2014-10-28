var should = require('should');
var db = require('../models/db');
var Customer = require('../models/customer');

describe('Customer Model Helper Class', function () {
    describe('getAllCustomers', function () {
        it('Should return a list of all customers', function (done) {
            Customer.getAllCustomers(function (err, o) {
                o.length.should.equal(91);
                done();
            });
        })
    });

    describe('getCustomer', function () {
        it('Should return one customer',
            function (done) {
                Customer.getCustomer("ALFKI", function (err, o) {
                    should.exist(o);
                    done();
                });
            }
        );
        it('Should return null',
            function (done) {
                Customer.getCustomer(0, function (err, o) {
                    should.not.exist(o);
                    done();
                });
            }
        )
    });
});