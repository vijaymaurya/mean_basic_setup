var schema = require('./schema.js'),
    mongoDB = require('./connection.js'),
    UserDataDB = mongoDB.useDb(require('./config')["mongo"]["database"]),
    commDB = mongoDB.useDb(require('./config')["comm_mongo"]["database"]),
    config = require('./config'),
    mongoose = require('mongoose'),
    collectionNameMappedSchema = {};

var Schema = mongoose.Schema;

var userSchema = new Schema(schema['User'],{'collection':'users','autoindex':true});

var User = UserDataDB.model('users',userSchema);

collectionNameMappedSchema['User'] = User;

var CURD = {
    find: function (queryObj) {
        return collectionNameMappedSchema[queryObj.collection].find(queryObj.query || {}, queryObj.projection || null, queryObj.options || null).sort(queryObj.sort || {}).exec();
    },
    insert: function (queryObj) {
        return (new collectionNameMappedSchema[queryObj.collection](queryObj.query)).save();
    },
    insertBulk: function (queryObj) {
        return collectionNameMappedSchema[queryObj.collection].collection.insert(queryObj.query);
    },
    update: function (queryObj) {
        return collectionNameMappedSchema[queryObj.collection].update(queryObj.find, queryObj.update,queryObj.options || {});
    }
};

module.exports = CURD;