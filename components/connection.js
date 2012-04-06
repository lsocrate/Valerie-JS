var mongoskin = require('mongoskin'),
    config = require('../config').config;

Connection = function (collection) {
  this.collection = collection;
  this.connection = mongoskin.db(config.mongo.connection).collection(collection);

  return this.connection;
};
Connection.prototype.close = function() {
  this.connection.close();
};

exports.Connection = Connection;