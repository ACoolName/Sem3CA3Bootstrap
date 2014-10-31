var express = require('express');

// Create a REST API handling
// 
function ExpressREST(facadePath, errorHandlePath) {
    this.router = express.Router();
    this.facade = require(facadePath);
    this.errorHandle = require(errorHandlePath);
    this.all = function(){
	this.router.get('/', function(req, res) {
	    this.facade.all(function (err, allOrders) {
		if(!this.errorHandler.errorHandle(err, res)) return;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(allOrders));
	    })
	});    
    };

    this.get = function(){
	this.router.get('/:id', function (req, res) {
	    res.render('orderDetails');
	});
    };

    this.update = function(){
	this.router.put('/:id', function (req, res) {
	    var orderId = req.params.id;
	    try {
		var obj = JSON.parse(req.rawBody);
		obj._id = orderId;
		this.facade.update(obj, function(err, numAffected) {
		    if (!this.errorHandler.errorHandle(err, res)) return;
		    if (numAffected == 0) {
			res.status(200).send({status: 200,
					      message: "Document not modified.",
					      type: 'Not Modified'});
			res.end();
			return;
		    }
		    res.setHeader('Content-Type', 'application/json');
		    res.end(JSON.stringify({"numAffected": numAffected}));
		});
	    } catch (e) {
		console.log(e);
		res.status(400).send({status: 400,
				      message: "Bad request.",
				      type: 'Bad request'});
		res.end();
	    }
	});
    };

    this.delete = function() {
	this.router.delete('/:id', function (req, res) {
	    var orderId = req.params.id;
	    this.facade.del(orderId, function(err, doc) {
		if (!errorHandler.errorHandle(err, res)) return;
		if (!doc) {
		    res.status(404).send({status: 404,
					  message: "Object not found",
					  type: 'Not Found'});
		    res.end();
		    return;
		}
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(doc));
	    });
	});

    };
}








module.exports = {ExpressREST: ExpressREST};
