var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var errorHandler = require('../helperClasses/errorHandler');

/* GET users listing. */
router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.render("products");
});

router.get('/all', function (req, res) {
    Product.all(function (err, p) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(p));
    });
})

router.get('/:id', function (req, res) {
    var catId = req.params.id;
    Product.getAllByCategoryId(catId,function (err, p) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(p));
    });
});

router.get('/category/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("products");

});

module.exports = router;