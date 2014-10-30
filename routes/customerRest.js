var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

router.get('/', function (req, res) {
    Customer.all(function (err, c) {
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        }
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
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(c));
    });
});

module.exports = router;