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
    Order.getOrder(orderId, function (err, o) {
        if (!errorHandler.errorHandle(err, res)) return;
        if (!o) {
        
            res.status(404).send({status: 404, message: "Object not found", type: 'Not Found'});
            res.end();
            return;
        }
        OrderDetails.getOrderDetailsByOrderId(orderId, function (err, orderDetails) {
            if (!errorHandler.errorHandle(err, res)) return;
            Customer.getCustomer(o.customerId, function (err, c) {
                if (!errorHandler.errorHandle(err, res)) return;
                var productIds = orderDetails.map(function (element) {
                    return element.productId;
                });
                productIds = { "$in": productIds};
                Product.getAllProducts(productIds, function (err, products) {
                    if (!errorHandler.errorHandle(err, res)) return;
                    Employee.getEmployee(o.employeeId, function (err, employee) {
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

module.exports = router;