var express = require('express');
var router = express.Router();
var orders = require('../models/orders');
var errorHandler = require('../helperClasses/errorHandler');

router.get('/', function(req, res) {
    orders.getAllOrders(function (err, allOrders) {
        if(!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(allOrders));
    })
});

module.exports = router;