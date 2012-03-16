var util = require('util');

var standardizeName = function (name){
  return name.toLowerCase().trim();
};

Character = function(){
  this.name         = '';
  this.clan         = '';
  this.bloodline    = '';
  this.covenants    = [];
  this.attributes   = {
    intelligence: 1,
    wits: 1,
    resolve: 1,
    strength: 1,
    dexterity: 1,
    stamina: 1,
    presence: 1,
    manipulation: 1,
    composure: 1
  };
  this.skills       = {};
  this.merits       = [];
  this.disciplines  = [];
  this.humanity     = 7;
  this.derangements = [];
  this.willpower    = {};
  this.vitae        = 8;
  this.bloodPotence = 1;
  this.health       = {};
  this.assets       = [];
};

Character.prototype.joinCovenants = function(covenants){
  if(!util.isArray(covenants)){
    covenants = [covenants];
  }

  for (var i = 0; i < covenants.length; i++) {
    this.covenants.push(covenants[i]);
  }

  return this;
};
Character.prototype.leaveCovenants = function(covenants){
  if(!util.isArray(covenants)){
    covenants = [covenants];
  }

  for (var i = 0; i < covenants.length; i++) {
    covenant      = covenants[i];
    covenantIndex = this.covenants.indexOf(covenant);
    if(covenantIndex > -1){
      this.covenants.splice(covenantIndex, 1);
    }
  }

  return this;
};
Character.prototype.gainMerit = function(merit){
  var level,
      description;

  level = (typeof arguments[1] === 'number') ? arguments[1] :
          (typeof arguments[2] === 'number') ? arguments[2] :
          1;

  description = (typeof arguments[1] === 'string') ? arguments[1] :
                (typeof arguments[2] === 'string') ? arguments[2] :
                null;

  this.merits.push({name:merit,level:level,description:description});

  return this;
};
Character.prototype.learnDiscipline = function(discipline, level) {
  var standardizedDisciplineName = standardizeName(discipline);

  this.disciplines[standardizedDisciplineName] = {name:discipline, level: level};

  return this;
};
Character.prototype.learnRitual = function(discipline, ritual, level) {
  var standardizedDisciplineName = standardizeName(discipline);

  this.disciplines[standardizedDisciplineName].rituals = [];
  this.disciplines[standardizedDisciplineName].rituals.push({name:ritual, level: level});

  return this;
};
Character.prototype.setAttibute = function(attribute, dots) {
  dots = parseInt(dots, 10);
  if(typeof dots === "number" && typeof attribute === "string"){
    this.attributes[standardizeName(attribute)] = dots;
  }

  return this;
};
Character.prototype.setSkill = function(skill) {
  var level,
      specialties = [];

  for (var i = 1; i < arguments.length; i++) {
    var argument = arguments[i];
    if(typeof argument === "number") {
      level = argument;
    } else if(typeof argument === "string") {
      specialties.push(argument);
    }
  }

  this.skills[skill] = {level:level, specialties:(specialties.length > 0) ? specialties : null};

  return this;
};
Character.prototype.gainDerangement = function(derangement) {
  var atHumanity = null;

  derangement = standardizeName(derangement);

  if(typeof arguments[1] === "number"){
    atHumanity = arguments[1];
  }

  this.derangements.push({name:derangement, atHumanity:atHumanity});

  return this;
};

exports.Character = Character;