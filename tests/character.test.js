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
    'test consecutive covenant join': function(beforeExit, assert) {
      var character = new Character();
      character.joinCovenants('Ordo Dracul').joinCovenants('The Invictus');
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
    }
};