'use strict';

var exportFunctions = {
    test : function(req,res){
    	console.log(req);
        return res.jsonp('Hello world');
    },
};

module.exports = exportFunctions;