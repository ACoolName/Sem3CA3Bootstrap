var express = require('express');
var router = express.Router();
var OrderDetails = require('../models/orderDetails');
var Order = require('../models/orders');
var Customer = require('../models/customer');

router.get('/:id', function(req, res) {
    var orderId = Number(req.params.id);
    Order.getOrder(orderId, function (err, o) {
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        } else if(!o) {
            res.status(404).send({status: 404, message: "Object not found", type: 'Not Found'});
            res.end();
            return;
        }
        OrderDetails.getOrderDetailsByOrderId(orderId, function (err, orderDetails) {
            if (err) {
                res.status(500).send({status: 500, message: err.message, type: 'internal'});
                res.end();
                return;
            }
            Customer.getCustomer(o.customerId, function (err, c) {
                if (err) {
                    res.status(500).send({status: 500, message: err.message, type: 'internal'});
                    res.end();
                    return;
                }
                var fullOrder = {
                    customer: c,
                    order: o,
                    orderDetails: orderDetails
                };
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(fullOrder));
            });
        });
    });
});

module.exports = router;