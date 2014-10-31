var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.render("products");
});

router.get('/category/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("products");

});

module.exports = router;