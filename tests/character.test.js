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
  },
  "test set attribute": function(beforeExit, assert) {
    var character = new Character();
    character.setAttibute('strength', 3);
    assert.equal(character.attributes.strength, 3);
  },
  "test set skill": function(beforeExit, assert) {
    var character = new Character();
    character.setSkill('drive', 3);
    assert.equal(character.skills.drive.level, 3);
    assert.equal(character.skills.drive.specialties, null);
  },
  "test set skill": function(beforeExit, assert) {
    var character = new Character();
    character.setSkill('drive', 3, "trucks", "bikes");
    assert.equal(character.skills.drive.level, 3);
    assert.equal(character.skills.drive.specialties.length, 2);
  },
  "test gain derangement": function(beforeExit, assert) {
    var character = new Character();
    character.gainDerangement("narcisism", 4);
    assert.eql({name:"narcisism",atHumanity:4}, character.derangements[0]);
  },
  "test gain asset": function(beforeExit, assert) {
    var character = new Character();
    character.gainAsset("firearms", 4, "Rambo");
    assert.eql({skill:"firearms", value:4, description:"Rambo"}, character.assets[0]);
  },
  "test get assets total": function(beforeExit, assert) {
    var character = new Character();
    character
      .gainAsset("firearms",  1, "Rambo")
      .gainAsset("crafts",    2, "Crafter")
      .gainAsset("occult",    3, "Crowley")
      .gainAsset("animalKen", 4, "Zoo");
    assert.equal(10, character.getAssetsTotal());
  },
  "test get Influence": function(beforeExit, assert) {
    var character = new Character();
    character
      .gainAsset("academics", 2)
      .gainAsset("politics", 3)
      .gainAsset("science", 1)
      .gainAsset("science", 3)
      .gainAsset("intimidation", 4)
      .gainAsset("persuasion", 3)
      .gainAsset("socialize", 2);
    assert.equal(3, character.getInfluence());
  },
  "test get Protection/Loyalty ": function(beforeExit, assert) {
    var character = new Character();
    character
      .gainAsset("academics", 2)
      .gainAsset("politics", 3)
      .gainAsset("science", 1)
      .gainAsset("science", 3)
      .gainAsset("intimidation", 4)
      .gainAsset("persuasion", 3)
      .gainAsset("socialize", 2);
    assert.equal(2, character.getAssetDefense());
  }
};