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
    Order.get(orderId, function (err, o) {
        if (!errorHandler.errorHandle(err, res)) return;
        if (!o) {
        
            res.status(404).send({status: 404, message: "Object not found", type: 'Not Found'});
            res.end();
            return;
        }
        OrderDetails.getAllByOrderId(orderId, function (err, orderDetails) {
            if (!errorHandler.errorHandle(err, res)) return;
            Customer.get(o.customerId, function (err, c) {
                if (!errorHandler.errorHandle(err, res)) return;
                var productIds = orderDetails.map(function (element) {
                    return element.productId;
                });
                productIds = { "$in": productIds};
                Product.all(productIds, function (err, products) {
                    if (!errorHandler.errorHandle(err, res)) return;
                    Employee.get(o.employeeId, function (err, employee) {
                        var hashMap = {};
                        products.forEach(function(prod) {
                            hashMap[prod._id] = prod;
                        });
                        var fullOrder = {
                            customer: c,
                            order: o,
                            orderDetails: orderDetails,
                            products: hashMap,
                            employee: employee
                        };
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(fullOrder));
                    });
                });
            });
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
