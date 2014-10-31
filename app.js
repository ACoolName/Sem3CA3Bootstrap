var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models/db');
var routes = require('./routes/index');
var users = require('./routes/users');
var orderREST = require('./routes/orderREST');
var orderUI = require('./routes/orderUI');
var orderdetails = require('./routes/orderdetails');
var employeeUI = require('./routes/employeeUI');
var employeeREST = require('./routes/employeeREST');
var productUI = require('./routes/productUI');
var productREST = require('./routes/productREST');
var customerRest = require('./routes/customerRest');
var customerUI = require('./routes/customerUI');
var category = require('./routes/categoryUI');
var start = require('./routes/start');
var categoryREST = require('./routes/categoryREST');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/json/customers', customerRest);
app.use('/json/order', orderREST);
app.use('/json/employee',employeeREST);
app.use('/json/categories',categoryREST);
app.use('/json/products',productREST);
app.use('/', routes);
app.use('/customers', customerUI);
app.use('/order',orderUI);
app.use('/orderdetails', orderdetails);
app.use('/employee',employeeUI);
app.use('/products',productUI);
app.use('/categories',category);
app.use('/start', start);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
