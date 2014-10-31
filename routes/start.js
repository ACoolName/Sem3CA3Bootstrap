var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("start");
});

module.exports = router;