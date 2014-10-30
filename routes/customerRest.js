var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var errorHandler = require('../helperClasses/errorHandler');

router.get('/', function (req, res) {
    Customer.all(function (err, c) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(c));
    });
});

router.get('/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("users");
});

router.get('/getcustomer/:id', function (req, res) {
    var customerId = req.params.id;
    Customer.get(customerId, function (err, c) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(c));
    });
});

module.exports = router;