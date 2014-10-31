var express = require('express');
var router = express.Router();
var Category = require('../models/categories');
var errorHandler = require('../helperClasses/errorHandler');

/* GET users listing. */
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("category");
});

router.get('/all', function (req, res) {
    Category.all(function (err, p) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(p));
    });
});

module.exports = router;