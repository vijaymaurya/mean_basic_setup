 var db = require('mongoose');
 module.exports = {
 	"User" : {
		"_id" : db.Schema.Types.ObjectId,
		"user_id" : {
			type : Number,
			index: { unique: true }
		},
		"group_id" : Array,
		"campaign" : Object
	},
 };