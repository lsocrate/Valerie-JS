var Db         = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server     = require('mongodb').Server;
var BSON       = require('mongodb').BSON;
var ObjectID   = require('mongodb').ObjectID;

CharacterProvider = function(host, port){
  this.db = new Db('valerie-js', new Server(host, port, {auto_reconnect:true}, {}));
  this.db.open(function(){});
};

CharacterProvider.prototype.getCollection = function(callback){
  this.db.collection('characters', function(error, characterCollection){
    if(error){
      callback(error);
    } else {
      callback(null, characterCollection);
    }
  });
};

CharacterProvider.prototype.findAll = function(callback){
  this.getCollection(function(error, characterCollection){
    if(error){
      callback(error);
    } else {
      characterCollection.find().toArray(function(error, results){
        if(error){
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

CharacterProvider.prototype.findById = function(id, callback){
  this.getCollection(function(error, characterCollection){
    if(error){
      callback(error);
    } else {
      characterCollection.findOne({_id: characterCollection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result){
        if(error){
          callback(error);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

CharacterProvider.prototype.save = function(characters, callback){
  this.getCollection(function(error, characterCollection){
    if(error){
      callback(error);
    } else {
      if(typeof characters.length == "undefined"){
        characters = [characters];
      }

      for (var i = 0; i < characters.length; i++) {
        character = characters[i];
        character.created_at = new Date();
        // @TODO character saving logic
      }

      characterCollection.insert(characters, function(){
        callback(null, characters);
      });
    }
  });
};

exports.CharacterProvider = CharacterProvider;