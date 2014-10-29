var should = require('should');
var db = require('../models/db');
var OrderDetails = require('../models/orderDetails');

describe('Order Details Model Helper Class', function () {
    describe('getAllOrderDetails', function () {
        it('Should return a list of all order details', function (done) {
            OrderDetails.getAllOrderDetails(function (err, o) {
                o.length.should.equal(2154);
                done();
            });
        })
    })
    describe('getOrderDetailsById', function () {
        it('Should return a list of all order details for specified order',
            function (done) {
                OrderDetails.getOrderDetailsByOrderId(10250, function (err, o) {
                    o.length.should.equal(3);
                    done();
                });
            }
        )
        it('Should return an empty list',
            function (done) {
                OrderDetails.getOrderDetailsByOrderId(0, function (err, o) {
                    o.length.should.equal(0);
                    done();
                });
            }
        )
    })
});
