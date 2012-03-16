Character = function(){
  this.name         = '';
  this.clan         = '';
  this.bloodline    = '';
  this.covenants    = [];
  this.attributes   = {};
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
  if(typeof covenants.length === 'undefined'){
    covenants = [covenants];
  }

  for (var i = 0; i < covenants.length; i++) {
    this.covenants.push(covenants[i]);
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

exports.Character = Character;