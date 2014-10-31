var mongoose = require( 'mongoose' );
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var dbUrl = "NOTAURL";
var db = mongoose.connect(dbUrl);

var model = require('../../database/model.js');
var fs = require('fs');
var async = require('async');

function readData(path) {
    var file = fs.readFileSync(path, 'utf8');
    var lines = file.split(/[\r]?[\n]/);
    var headers = lines[0].split(',');
    var data = JSON.parse(lines[1]);
    var result = data.map(function(e) {
        var res = {};
        for(var i = 0; i < e.length; i++) {
            if(e[i] !== 'NULL')
                res[headers[i]] = e[i];
        }
        return res;
    });
    return result;
}

function getCustomers(customers) {
    return customers.map(function(customer) {
        return {
            _id: customer.customerID,
            companyName: customer.companyName,
            contactName: customer.contactName,
            contactTitle: customer.contactTitle,
            address: customer.address,
            city: customer.city,
            region: customer.region,
            postalCode: customer.postalCode,
            country: customer.country,
            phone: customer.phone,
            fax: customer.fax
        };
    });
}

function getEmployees(employees) {
    return employees.map(function(emp) {
        return {
            _id: emp.employeeID,
            lastName: emp.lastName,
            firstName: emp.firstName,
            title: emp.title,
            titleOfCourtesy: emp.titleOfCourtesy,
            birthDate: emp.birthDate.substring(0, 10),
            hireDate: emp.hireDate.substring(0, 10),
            address: emp.address,
            city: emp.city,
            region: emp.region,
            postalCode: emp.postalCode,
            country: emp.country,
            homePhone: emp.homePhone,
            extension: emp.extension,
            notes: emp.notes
        };
    });
}

function getCategories(categories) {
    return categories.map(function(category) {
        return {
            _id: category.categoryID,
            name: category.categoryName,
            description: category.description
        };
    });
}

function getProducts(products) {
    return products.map(function(product) {
        return {
            _id: product.productID,
            name: product.productName,
            categoryId: product.categoryID,
            quantityPerUnit: product.quantityPerUnit,
            unitPrice: product.unitPrice,
            unitsInStock: product.unitsInStock,
            unitsOnOrder: product.unitsOnOrder,
            reorderLevel: product.reorderLevel,
            discontinued: product.discontinued
        };
    });
}

function getOrderDetails(order_details) {
    return order_details.map(function(e) {
        return {
            orderId: e.orderID,
            productId: e.productID,
            unitPrice: e.unitPrice,
            quantity: e.quantity,
            discount: e.discount
        };
    })
}

function getOrders(orders) {
    return orders.map(function(e) {
        return {
            _id: e.orderID,
            customerId: e.customerID,
            employeeId: e.employeeID,
            orderDate: e.orderDate.substring(0, 10),
            requiredDate: e.requiredDate.substring(0, 10),
            shippedDate: e.shippedDate.substring(0, 10),
            shipVia: e.shipVia,
            freight: e.freight,
            shipName: e.shipName,
            shipAddress: e.shipAddress,
            shipCity: e.shipCity,
            shipRegion: e.shipRegion,
            shipPostalCode: e.shipPostalCode,
            shipCountry: e.shipCountry
        };
    });
}

function initializeDB() {
    var categories = readData('test/data/categories.json');
    var customers = readData('test/data/customers.json');
    var employees = readData('test/data/employees.json');
    var order_details = readData('test/data/order_details.json');
    var orders = readData('test/data/orders.json');
    var products = readData('test/data/products.json');

    model.CategoryModel.remove({}).exec();
    model.ProductModel.remove({}).exec();
    model.EmployeeModel.remove({}).exec();
    model.CustomerModel.remove({}).exec();
    model.DetailsModel.remove({}).exec();
    model.OrderModel.remove({}).exec();

    var asyncTasks = [];

    function addData(data, dataModel) {
        data.forEach(function(item){
            asyncTasks.push(function(callback){
                var element = new dataModel(item);
                element.save(function(err, order) {
                    if(err) console.log(err);
                    callback();
                });
            });
        });
    }


    addData(getCategories(categories), model.CategoryModel);
    addData(getProducts(products), model.ProductModel);
    addData(getEmployees(employees), model.EmployeeModel);
    addData(getCustomers(customers), model.CustomerModel);
    addData(getOrders(orders), model.OrderModel);
    addData(getOrderDetails(order_details), model.DetailsModel);
    async.series(asyncTasks, function(){
    });
}


module.exports = {
    initializeDB: initializeDB
};