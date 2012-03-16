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
  "test gain merit": function(beforeExit, assert) {
    var character = new Character();
    var character2 = new Character();

    character.gainMerit('Allies', 'Fazendeiros', 4);
    assert.eql({name:"Allies", description:"Fazendeiros", level: 4}, character.merits[0]);

    character2.gainMerit('Allies', 4, 'Fazendeiros');
    assert.eql({name:"Allies", description:"Fazendeiros", level: 4}, character.merits[0]);
  },
  "test learn discipline": function(beforeExit, assert) {
    var character = new Character();
    character.learnDiscipline('Dominate', 4);
    assert.eql({name:"Dominate", level: 4}, character.disciplines["dominate"]);
  },
  "test learn ritual": function(beforeExit, assert) {
    var character = new Character();
    character.learnDiscipline('Crúac', 3);
    character.learnRitual('Crúac', 'Pangs of Proserpina', 2);
    assert.eql({name:"Pangs of Proserpina", level: 2}, character.disciplines["crúac"].rituals[0]);
  }
};