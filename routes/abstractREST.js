var express = require('express');

/*
  REST API generator that's cooler than all yo' stupid
  repeating retarded code.
  / -> GET -> all -> json list of objects
  /:id -> GET -> get one -> json object
  /:id -> PUT -> update one -> {"numAffected": <x>}
  /:id -> DELETE -> delete one -> json object

  The intermediate step between constructing and loading
  the methods in router(a.k.a produce) allows for modifications
  of the existing defaults.
*/

function ExpressREST(facadePath, errorHandlePath) {
    this.router = express.Router();
    this.facade = require(facadePath);
    this.router.get.facade = this.facade;
    this.errorHandler = require(errorHandlePath);
    this.all = function(){
	var facade = this.facade;
	var errorHandler = this.errorHandler;
	this.router.get('/', function(req, res) {
	    facade.all(function (err, elements) {
		if(!errorHandler.errorHandle(err, res)) return;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(elements));
	    })
	});    
    };

    this.get = function(){
	var facade = this.facade;
	var errorHandler = this.errorHandler;
	this.router.get('/:id', function (req, res) {
	    var id = req.params.id;
	    facade.get(id, function (err, el) {
		if (!errorHandler.errorHandle(err, res)) return;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(el));
	    });
	});
    };

    this.update = function(){
	var facade = this.facade;
	var errorHandler = this.errorHandler;
	this.router.put('/:id', function (req, res) {
	    var id = req.params.id;
	    try {
		var obj = JSON.parse(req.rawBody);
		obj._id = id;
		facade.update(obj, function(err, numAffected) {
		    if (!errorHandler.errorHandle(err, res))
			return;
		    if (numAffected == 0) {
			var errm = "Document not modified.";
			res.status(200).send({status: 200,
					      message: errm,
					      type: 'Not Modified'});
			res.end();
			return;
		    }
		    res.setHeader('Content-Type', 'application/json');
		    res.end(JSON.stringify(
			{"numAffected": numAffected}));
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
	var facade = this.facade;
	var errorHandler = this.errorHandler;
	this.router.delete('/:id', function (req, res) {
	    var id = req.params.id;
	    facade.del(id, function(err, el) {
		if (!errorHandler.errorHandle(err, res))
		    return;
		if (!doc) {
		    res.status(404).send({status: 404,
					  message: "Object not found",
					  type: 'Not Found'});
		    res.end();
		    return;
		}
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(el));
	    });
	});
    };

    this.produce = function() {
	this.all();
	this.get();
	this.update();
	this.delete();
    }
}

module.exports = {ExpressREST: ExpressREST};
