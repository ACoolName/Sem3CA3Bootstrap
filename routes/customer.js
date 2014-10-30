var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

/* GET users listing. */
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("customers");
});

module.exports = router;