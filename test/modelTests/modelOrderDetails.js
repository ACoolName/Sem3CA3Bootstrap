var should = require('should');
var beforeTest = require('./beforeTest');
var OrderDetails = require('../../models/orderDetails');

describe('Order Details Model Helper Class', function () {
    describe('getAllOrderDetails', function () {
        it('Should return a list of all order details', function (done) {
            OrderDetails.all(function (err, o) {
                o.length.should.equal(2);
                //console.log(o[0]);
                done();
            });
        })
    });
    describe('getOrderDetailsById', function () {
        it('Should return a list of all order details  when using valid id',
            function (done) {
                OrderDetails.getAllByOrderId(10248, function (err, o) {
                    o.length.should.equal(2);
                    done();
                });
            }
        );
        it('Should return an empty list  when using invalid id',
            function (done) {
                OrderDetails.getAllByOrderId(0, function (err, o) {
                    o.length.should.equal(0);
                    done();
                });
            }
        )
    })
});
