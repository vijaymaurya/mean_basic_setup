'use strict';

/**
 * Module dependencies.
 */
var express     = require('express');
var fs          = require('fs'),
    path = require('path'),
    cluster = require('cluster'),
    numCPUs;
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations
var config          = require('./config/config');
var winston         = require('./user_libs/winston');
var db              = require('./config/sequelize');

var app = express();   // icreasing the limit : else giving error Request entity too large.


numCPUs = require('os').cpus().length; //Find number of CPU units
process.on('uncaughtException', function (err) {
    winston.info(err.stack);
});

if (cluster.isMaster) {
	// numCPUs = 1;
	winston.info('Starting '+config.app.name+'...');
	winston.info('Config loaded: '+config.NODE_ENV);
	winston.debug('Accepted Config:',config);
    winston.info('Number of CPUs: ' + numCPUs);
    /* Fork processes equal to 1 minus number of CPUs as one process is the parent process */
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        winston.info(' Forked myself!!!!');
        winston.info('Worker ' + worker.id + ' died..');
        //cluster.fork();
    });
} else {

    app.all('/*', function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });
	//Initialize Express
	require('./config/express')(app);
	// require('./config/express')(app, passport);

	//Start the app by listening on <port>
	app.listen(config.PORT);
	winston.info('Express app started on port ' + config.PORT);

}
//expose app
module.exports = app;
