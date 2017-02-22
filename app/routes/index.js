'use strict';

var index = require('../../app/controllers/index');
module.exports = function(app) {
	// Home route
	// app.get('/', index.render);
	app.get('/', function(req, res){
	    res.sendfile('public/views/index.html');
	  	// res.render('new_index.html');
	});
};

