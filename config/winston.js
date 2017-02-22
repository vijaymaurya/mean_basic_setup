'use strict';


var winston = require('winston');
var logger = new (winston.Logger)({ exitOnError: false });

logger.add(winston.transports.Console, {
    level: 'verbose',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: function () {
          return new Date().toLocaleString();
        },
    handleExceptions: true,
    json: false,
});

logger.add(winston.transports.File, {
    name:'all.log',
    filename: '/var/log/billprocessv2.log',
    json: false
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;
