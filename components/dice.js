Die = {
  roll: function(){
    return Math.ceil(Math.random() * 10);
  }
};

Pool = function(dices){
  this.dices = parseInt(dices, 10);
  this.weak = false;
  this.rerollThreshold = 10;
};
Pool.prototype.isWeak = function() {
  this.weak = true;

  return this;
};
Pool.prototype.reroll = function(threshold) {
  this.rerollThreshold = parseInt(threshold, 10);

  return this;
};
Pool.prototype.roll = function() {
  var successes = 0,
      roll;

  if(this.dices < 1) {
    while(true){
      roll = Die.roll();
      if(roll === 10){
        successes++;
      } else if(roll === 1) {
        successes--;
      } else {
        break;
      }
    }

    return {successes:successes, passed:(successes > 0)};
  }

  for (var i = 0; i < this.dices; i++) {
    roll = Die.roll();
    if(roll >= 8) {
      successes++;
    }
    if(!this.weak && roll >= this.rerollThreshold) {
      this.dices++;
    }
  }

  return {successes:successes, passed:(successes > 0)};
};

exports.Die  = Die;
exports.Pool = Pool;