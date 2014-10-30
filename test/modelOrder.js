var should = require('should');
var db = require('../models/db');
var orders = require('../models/orders');
var mongoose = require('mongoose');
var Order = mongoose.model('orders');

describe('Order Model Helper Class', function () {
    describe('getAllOrders', function () {
        it('Should return a list of all orders', function (done) {
            orders.all(function (err, o) {
                o.length.should.equal(830);
                console.log(o[0]._id);
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
    describe('updateOrder', function () {
	it('Should affect 1 object', function(done) {
	    orders.update({_id: 10250,
			   shipVia: "My ass",
			   shipCountry: "Lalaland"},
			  function (err, numAffected) {
			      numAffected.should.equal(1);
			      done();
			  });
	})

	it('Should update the order', function(done) {
	    orders.update({_id: 10250,
			   shipVia: "My butt",
			   shipCountry: "Nogoland"},
			  function (err, numAffected) {
			      orders.get(10250, function (err, o) {
				  var p = o.shipCountry;
				  o.shipVia.should.equal("My butt");
				  p.should.equal("Nogoland");
				  done();
			      });
			  });
	})
    })

    describe('deleteOrder', function () {
	it('Should delete an order', function(done){
	    var el = Order({_id: 99999,
			    customerId: "VINET",
			    employeeId: 5,
			    orderDate: "1996-07-04 00:00:00",
			    requiredDate: "1996-08-01 00:00:00",
			    shippedDate: "1996-07-16 00:00:00",
			    shipVia: "Neutrino highway",
			    freight: 11,
			    shipName: "Human",
			    shipAddress: "Sub-orbit, sector 3, AF",
			    shipCity: "Regulus star city",
			    shipRegion: "Leo constellation",
			    shipPostalCode: "@#222",
			    shipCountry: "Bobaoo empire"});
	    el.save(function (err, order){
		orders.del(99999, function (err, doc) {
		    orders.get(99999, function (err, entity) {
			should.not.exist(entity);
			done();
		    });

		});
	    });
	})
    })
    
});
