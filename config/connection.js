var mongoose = require('mongoose');
	//dbConfig = require('../config/mongoDB.json');
var config = require('./config');

//--- Another way to connect
var db = mongoose.createConnection('mongodb://' +config.mongo.host+":"+config.mongo.port+'/'+config.mongo.database+'?readPreference=secondaryPreferred');

db.on('error', function (err) {
  // error on startup
   console.log('Mongoose default connection error: ' + err);
});
db.once('open', function callback() {
    console.log('Mongoose default connection open to ' + config.mongo.host + ".");
});
// When the connection is disconnected
db.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  db.close(function () { 
    console.log('Mongoose default connection disconnected through app termination.'); 
    process.exit(0); 
  }); 
});  

module.exports = db;

