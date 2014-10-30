var express = require('express');
var router = express.Router();
var orders = require('../models/orders');
var errorHandler = require('../helperClasses/errorHandler');

router.get('/', function(req, res) {
    orders.all(function (err, allOrders) {
        if(!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(allOrders));
    })
});

router.get('/:id', function (req, res) {
    res.render('orderDetails');
});

router.put('/:id', function (req, res) {
    var orderId = req.params.id;
    try {
        var obj = JSON.parse(req.rawBody);
        obj._id = orderId;
        Order.update(obj, function(err, numAffected) {
            if (!errorHandler.errorHandle(err, res)) return;
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

router.delete('/:id', function (req, res) {
    var orderId = req.params.id;
    Order.del(orderId, function(err, doc) {
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

module.exports = router;
