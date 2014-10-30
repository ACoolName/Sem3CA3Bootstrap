var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');
var errorHandler = require('../helperClasses/errorHandler');

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("employees");
});

router.get('/all', function (req, res) {
    Employee.all(function (err, e) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(e));
    });
});

/* GET users listing. */
router.get('/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render("employee");
});

router.get('/getemployee/:id', function (req, res) {
    var employeeId = req.params.id;
    Employee.get(employeeId, function (err, emp) {
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(emp));
    });
});

module.exports = router;
