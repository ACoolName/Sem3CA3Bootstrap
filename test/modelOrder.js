var should = require('should');
var db = require('../models/db');
var orders = require('../models/orders');

describe('Order Model Helper Class', function () {
    describe('getAllOrders', function () {
        it('Should return a list of all orders', function (done) {
            orders.getAllOrders(function (err, o) {
                o.length.should.equal(830);
                console.log(o[0]._id);
                done();
            });
        })
    })
    describe('getOrder', function () {
        it('Should return order', function (done) {
            orders.getOrder(10250, function (err, o) {
                should.exist(o);
                done();
            });
        })
    })
});