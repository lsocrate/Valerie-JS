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
    }
};