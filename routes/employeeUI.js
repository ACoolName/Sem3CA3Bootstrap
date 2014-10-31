var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("employee");
});

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("employees");
});

module.exports = router;