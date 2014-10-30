var should = require('should');
var beforeTest = require('./beforeTest');
var orders = require('../../models/orders');

describe('Order Model Helper Class', function () {
    describe('getAllOrders', function () {
        it('Should return a list of all orders', function (done) {
            orders.all(function (err, o) {
                o.length.should.equal(13);
                done();
            });
        })
    })
    describe('getOrder', function () {
        it('Should return order', function (done) {
            orders.get(10250, function (err, o) {
                should.exist(o);
                done();
            });
        })
    })
});
