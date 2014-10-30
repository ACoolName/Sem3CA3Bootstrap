var should = require('should');
var beforeTest = require('./beforeTest');
var Customer = require('../../models/customer');

describe('Customer Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all customers', function (done) {
            Customer.all(function (err, c) {
                c.length.should.equal(2);
                done();
            });
        })
    });

    describe('get', function () {
        it('Should return one customer  when using valid id',
            function (done) {
                Customer.get("ALFKI", function (err, c) {
                    should.exist(c);
                    done();
                });
            }
        );
        it('Should return null when using invalid id',
            function (done) {
                Customer.get(0, function (err, c) {
                    should.not.exist(c);
                    done();
                });
            }
        )
    });
});
