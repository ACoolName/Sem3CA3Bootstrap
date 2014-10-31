var express = require('express');
var router = express.Router();
var orders = require('../models/orders');

router.get('/:id', function (req, res) {
    res.render('orderDetails');
});

module.exports = router;