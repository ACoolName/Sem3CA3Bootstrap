var express = require('express');
var router = express.Router();
var OrderDetails = require('../models/orderDetails');
var Order = require('../models/orders');
var Customer = require('../models/customer');
var Product = require('../models/product');
var Employee = require('../models/employee');
var errorHandler = require('../helperClasses/errorHandler');

router.get('/:id', function (req, res) {
    var orderId = req.params.id;
    var done = 0;
    var customer;
    var order;
    var orderDetails;
    var employee;
    var products;

    function finished() {
        done++;
        if (done != 3) return;

        var hashMap = {};
        products.forEach(function (prod) {
            hashMap[prod._id] = prod;
        });
        var fullOrder = {
            customer: customer,
            order: order,
            orderDetails: orderDetails,
            products: hashMap,
            employee: employee
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(fullOrder));
    }

    Order.get(orderId, function (err, o) {
        if (!errorHandler.errorHandle(err, res)) return;
        if (!o) {
            res.status(404).send({status: 404, message: "Object not found", type: 'Not Found'});
            res.end();
            return;
        }
        order = o;
        Customer.get(o.customerId, function (err, c) {
            if (!errorHandler.errorHandle(err, res)) return;
            customer = c;
            finished();
        });
        Employee.get(o.employeeId, function (err, e) {
            if (!errorHandler.errorHandle(err, res)) return;
            employee = e;
            finished();
        });
    });

    OrderDetails.getAllByOrderId(orderId, function (err, od) {
        if (!errorHandler.errorHandle(err, res)) return;
        orderDetails = od;
        var productIds = orderDetails.map(function (element) {
            return element.productId;
        });
        productIds = { "$in": productIds};
        Product.all(productIds, function (err, p) {
            if (!errorHandler.errorHandle(err, res)) return;
            products = p;
            finished();
        });
    });

});
router.get('/customer/:id',function(req,res){
   var customerId = req.params.id;
    Order.getAllByCustomerId(customerId,function(err,orderDetails){
        if (!errorHandler.errorHandle(err, res)) return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(orderDetails));
    });
});



module.exports = router;
