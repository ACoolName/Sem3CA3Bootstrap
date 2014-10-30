var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET users listing. */
router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.render("products");
});

router.get('/all', function (req, res) {
    Product.getAllProducts(function (err, p) {
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(p));
    });
});

module.exports = router;