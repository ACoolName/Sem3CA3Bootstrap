var express = require('express');
var router = express.Router();
var orders = require('../models/orders');

router.get('/', function(req, res) {
    orders.getAllOrders(function (err, allOrders) {
        if (err) {
            res.send(500, {status:500, message: err.message, type:'internal'});
            res.end();
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(allOrders));
    })
});

router.get('/:id', function (req, res) {
    res.render('orderDetails');
});

module.exports = router;