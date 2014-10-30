var should = require('should');
var beforeTest = require('./beforeTest');
var Customer = require('../../models/customer');

describe('Customer Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all customers', function (done) {
            Customer.all(function (err, o) {
                c.length.should.equal(2);
                done();
            });
        })
    });

    describe('get', function () {
        it('Should return one customer',
            function (done) {
                Customer.get("ALFKI", function (err, o) {
                    should.exist(c);
                    done();
                });
            }
        );
        it('Should return null',
            function (done) {
                Customer.get(0, function (err, o) {
                    should.not.exist(c);
                    done();
                });
            }
        )
    });
});
