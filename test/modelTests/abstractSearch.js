var should = require('should');
var beforeTest = require('./beforeTest');
var mongoose = require('mongoose');
var Customer = mongoose.model('customers');
var Categories = mongoose.model('categories');
var Order = mongoose.model('orders');
var abs = require('../../models/abstractSearch');

describe('Abstract Search Class', function () {
    describe('createFindFunc', function () {
        it('Should create function that can find all objects of the passed in class', function (done) {
            var customerFindFunc = abs.createFindFunc(Customer);
            customerFindFunc(function (err, c) {
                c.length.should.equal(2);
                done();
            });
        })
    });
    describe('createFindOneFunc', function () {
        it('Should create function that can find one objects of the passed in class',
            function (done) {
                var categoriesFindFunc = abs.createFindOneFunc(Categories);
                categoriesFindFunc(1, function (err, c) {
                    should.exist(c);
                    done();
                });
            }
        );
    });
    describe('createUpdateFunc', function () {
        it('Should update one object of the passed in class',
            function (done) {
//                var orderUpdateFunc = abs.createUpdateFunc(Order);
//                orderUpdateFunc(1, function (err, c) {
//                    should.exist(c);
//                    done();
//                })
                should.exist(null);
            }
        )
    });
});