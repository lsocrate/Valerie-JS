var Character = require('../models/character').Character;
module.exports = {
    'test single covenant join': function(beforeExit, assert) {
      var character = new Character();
      character.joinCovenants('Ordo Dracul');
      assert.eql(['Ordo Dracul'], character.covenants);
    },
    'test double covenant join': function(beforeExit, assert) {
      var character = new Character();
      character.joinCovenants(['Ordo Dracul', 'The Invictus']);
      assert.eql(['Ordo Dracul', 'The Invictus'], character.covenants);
    },
    'test leave covenant': function(beforeExit, assert) {
      var character = new Character();
      character.joinCovenants('Ordo Dracul').joinCovenants('The Invictus');
      character.leaveCovenants('The Invictus');
      assert.eql(['Ordo Dracul'], character.covenants);
    },
    'test leave multi covenant': function(beforeExit, assert) {
      var character = new Character();
      character.joinCovenants('Ordo Dracul').joinCovenants('The Invictus');
      character.leaveCovenants(['The Invictus', 'Ordo Dracul']);
      assert.eql([], character.covenants);
    },
    "test leave covenant that doesn't belong": function(beforeExit, assert) {
      var character = new Character();
      character.joinCovenants('Ordo Dracul').joinCovenants('The Invictus');
      character.leaveCovenants('The Lancea Sanctum');
      assert.eql(['Ordo Dracul', 'The Invictus'], character.covenants);
    },
    "test gain merit order 1": function(beforeExit, assert) {
      var character = new Character();
      character.gainMerit('Allies', 'Fazendeiros', 4);
      assert.eql({name:"Allies", description:"Fazendeiros", level: 4}, character.merits[0]);
    },
    "test gain merit order 2": function(beforeExit, assert) {
      var character = new Character();
      character.gainMerit('Allies', 4, 'Fazendeiros');
      assert.eql({name:"Allies", description:"Fazendeiros", level: 4}, character.merits[0]);
    }
};