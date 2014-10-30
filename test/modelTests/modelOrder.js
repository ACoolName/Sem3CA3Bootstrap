var should = require('should');
var beforeTest = require('./beforeTest');
var orders = require('../../models/orders');

describe('Order Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all orders', function (done) {
            orders.all(function (err, o) {
                o.length.should.equal(13);
                done();
            });
        })
    });
    describe('get', function () {
        it('Should return order when using valid id', function (done) {
            orders.get(10250, function (err, o) {
                should.exist(o);
                done();
            });
        });
        it('Should return null when using invalid id', function (done) {
            orders.get(-20, function (err, o) {
                should.not.exist(o);
                done();
            });
        })
    });
});
