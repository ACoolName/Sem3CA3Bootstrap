var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://test:test@ds063879.mongolab.com:63879/testraulstelescu';
//var dbURI = 'mongodb://localhost/northwind';
mongoose.connect(dbURI);

var model = require('../database/model.js');

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});




