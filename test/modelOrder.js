var should = require('should');
var db = require('../models/db');
var orders = require('../models/orders');

describe('Order Model Helper Class', function () {
    describe('getAllOrders', function () {
        it('Should return a list of all orders', function (done) {
            orders.getAllOrders(function (err, o) {
                o.length.should.equal(830);
                done();
            });
        })
    })
})