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
        it('Should return a product when using valid id', function (done) {
            Product.get(2, function (err, p) {
                should.exist(p);
                done();
            });
        });
        it('Should return null when using invalid id', function (done) {
            Product.get(-99, function (err, p) {
                should.not.exist(p);
                done();
            });
        })
    });
});