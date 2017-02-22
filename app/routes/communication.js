'use strict';

/**
* Module dependencies.
*/
var communicationController = require('../../app/controllers/communicationController')
module.exports = function(app) {

app.route('/users/communication/test').get(communicationController.test);

};