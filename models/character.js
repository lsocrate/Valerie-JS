var Db         = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server     = require('mongodb').Server;
var BSON       = require('mongodb').BSON;
var ObjectID   = require('mongodb').ObjectID;

CharacterProvider = function(host, port){
  this.db = new Db('valerie-js', new Server(host, port, {auto_reconnect:true}, {}));
  this.db.open(function(){});
};