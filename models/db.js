var mongoose = require( 'mongoose' );

//var dbURI = 'mongodb://localhost/joke';
//Please change this to your own DB
var dbURI = 'mongodb://test:test@ds063879.mongolab.com:63879/testraulstelescu';
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




