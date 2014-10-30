var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');

router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.render("employees");
});

router.get('/all', function (req, res) {
    Employee.all(function (err, e) {
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(e));
    });
});

/* GET users listing. */
router.get('/:id', function (req, res) {
    var employeeId = req.params.id;
    Employee.get(employeeId, function (err, emp) {
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        }
        console.log("------------------------------")
        console.log(emp);
        res.setHeader('Content-Type', 'text/html');
        res.render("employee");
    });
});

router.get('/getemployee/:id', function (req, res) {
    var employeeId = req.params.id;
    Employee.get(employeeId, function (err, emp) {
        if (err) {
            res.status(500).send({status: 500, message: err.message, type: 'internal'});
            res.end();
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(emp));
    });
});

module.exports = router;
