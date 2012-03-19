var util = require('util');

Number.prototype.trim = function(a, b) {
  var min = Math.min(a, b),
      max = Math.max(a, b);

  return Math.min(Math.max(parseInt(this, 10), min), max);
};
String.prototype.toStandard = function() {
  return this.toLowerCase().trim();
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
  this.willpower    = {
    dots:2,
    points:2
  };
  this.vitae        = Math.ceil(Math.random() * 10);
  this.bloodPotence = 1;
  this.size         = 5;
  this.health       = {
    max: this.attributes.stamina + this.size,
    bash: 0,
    lethal: 0,
    aggr: 0
  };
  this.assets       = [];
  this.maxDots      = 5;
};

Character.prototype.setName = function(name) {
  this.name = name.toString();

  return this;
};
Character.prototype.setClan = function(clan) {
  this.clan = clan.toString().toLowerCase();

  return this;
};
Character.prototype.joinBloodline = function(bloodline) {
  this.bloodline = bloodline.toString();

  return this;
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

  if(merit.toStandard() === "large"){
    this.size = 6;
  }

  this.merits.push({name:merit,level:level,description:description});

  return this;
};
Character.prototype.learnDiscipline = function(discipline, level) {
  var standardizedDisciplineName = discipline.toStandard();

  this.disciplines[standardizedDisciplineName] = {name:discipline, level: level};

  return this;
};
Character.prototype.learnRitual = function(discipline, ritual, level) {
  var standardizedDisciplineName = discipline.toStandard();

  this.disciplines[standardizedDisciplineName].rituals = [];
  this.disciplines[standardizedDisciplineName].rituals.push({name:ritual, level: level});

  return this;
};
Character.prototype.setAttribute = function(attribute, dots) {
  dots = parseInt(dots, 10).trim(1, this.maxDots);
  if(typeof dots === "number" && typeof attribute === "string"){
    this.attributes[attribute.toStandard()] = dots;
  }

  return this;
};
Character.prototype.setSkill = function(skill) {
  var level,
      specialties = [];

  for (var i = 1; i < arguments.length; i++) {
    var argument = arguments[i];
    if(typeof argument === "number") {
      level = argument.trim(1, this.maxDots);
    } else if(typeof argument === "string") {
      specialties.push(argument);
    }
  }

  this.skills[skill] = {level:level, specialties:(specialties.length > 0) ? specialties : null};

  return this;
};
Character.prototype.gainDerangement = function(derangement) {
  var atHumanity = null;

  derangement = derangement.toStandard();

  if(typeof arguments[1] === "number"){
    atHumanity = arguments[1];
  }

  this.derangements.push({name:derangement, atHumanity:atHumanity});

  return this;
};
Character.prototype.gainAsset = function(skill, value) {
  var description = null;

  if(typeof arguments[2] === "string"){
    description = arguments[2];
  }

  value = parseInt(value, 10).trim(1, 5);

  this.assets.push({skill:skill,value:value,description:description});

  return this;
};
Character.prototype.getAssetsTotal = function() {
  var assetsTotal = 0;
  for (var i = 0; i < this.assets.length; i++) {
    var asset = this.assets[i];
    assetsTotal += asset.value;
  }

  return assetsTotal;
};
Character.prototype.getInfluence = function() {
  return Math.floor(Math.ceil(Math.ceil(this.getAssetsTotal() - 5, 0) / 5), 10);
};
Character.prototype.getAssetDefense = function() {
  var influence = this.getInfluence();

  return (influence === 10) ? 4 : Math.ceil(influence/2);
};
Character.prototype.getAgentXP = function() {
  var influence = this.getInfluence();

  return (influence < 3) ? 0 :
         (influence < 9) ? (influence - 3) * 5 + 10 :
         (influence - 9) * 10 + 40;
};
Character.prototype.setHumanity = function(humanity) {
  this.humanity = parseInt(humanity, 10).trim(1, 10);

  return this;
};
Character.prototype.adjustHumanity = function(adjust) {
  this.humanity += parseInt(adjust, 10);

  return this;
};
Character.prototype.setVitae = function(vitae) {
  this.vitae = parseInt(vitae, 10);

  return this;
};
Character.prototype.adjustVitae = function(vitae) {
  this.vitae += parseInt(vitae, 10);

  return this;
};
Character.prototype.updateMaxDots = function() {
  this.maxDots = (this.bloodPotence < 6) ? 5 : this.bloodPotence - 5 ;

  return this;
};
Character.prototype.setBloodPotence = function(bloodPotence) {
  this.bloodPotence = parseInt(bloodPotence, 10).trim(1,10);

  this.updateMaxDots();

  return this;
};
Character.prototype.adjustBloodPotence = function(bloodPotence) {
  this.bloodPotence += parseInt(bloodPotence, 10);
  this.bloodPotence = this.bloodPotence.trim(1,10);

  this.updateMaxDots();

  return this;
};
Character.prototype.setWillpower = function(willpower) {
  var newWillpower = parseInt(willpower, 10).trim(1, this.maxDots * 2);

  this.willpower.points = (this.willpower.points === this.willpower.dots) ? newWillpower :
                          this.willpower.points.trim(0, newWillpower);
  this.willpower.dots = newWillpower;

  return this;
};
Character.prototype.spendWillpower = function() {
  this.willpower.points = (this.willpower.points - 1).trim(0, this.willpower.dots);

  return this;
};
Character.prototype.updateWounds = function() {
  this.health.aggr   = this.health.aggr.trim(0, this.health.max);
  this.health.lethal = this.health.lethal.trim(0, this.health.max - this.health.aggr);
  this.health.bash   = this.health.bash.trim(0, this.health.max - this.health.aggr - this.health.lethal);

  return this;
};
Character.prototype.setHealth = function() {
  this.health.max = this.attributes.stamina + this.size;

  this.updateWounds();

  return this;
};
Character.prototype.wound = function(damage) {
  var wound = damage.match(/^(\d*)(\w)/),
      quantity = parseInt(wound[1], 10),
      typeSign = wound[2],
      type = (typeSign.toStandard() === "b") ? 'bash':
             (typeSign.toStandard() === "l") ? 'lethal':
             (typeSign.toStandard() === "a") ? 'aggr' : null ;

  if(typeof quantity === "number" && typeof type === "string") {
    this.health[type] += quantity;
    this.updateWounds();
  }

  return this;
};

exports.Character = Character;