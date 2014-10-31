var should = require('should');
var beforeTest = require('./beforeTest');
var Product = require('../../models/product');

describe('Product Model Helper Class', function () {
    describe('all', function () {
        it('Should return a list of all products', function (done) {
            Product.all(function (err, p) {
                p.length.should.equal(3);
                done();
            });
        })
    });
    describe('get', function () {
        it('Should return a list of products', function (done) {
            Product.get(2, function (err, p) {
                p.length.should.equal(1);
                done();
            });
        });
        it('Should return an empty list', function (done) {
            Product.get(-99, function (err, p) {
                p.length.should.equal(0);
                done();
            });
        })
    });
});