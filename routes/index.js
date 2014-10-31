var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Order Viewer' });
});

router.get('/documentation', function(req, res) {
   res.render('documentation');
});

router.get('/edit', function(req, res) {
    res.render('edit');
});

module.exports = router;
