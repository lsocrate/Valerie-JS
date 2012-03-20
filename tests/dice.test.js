var Die = require('../components/dice').Die;
var Pool = require('../components/dice').Pool;

module.exports = {
  'test roll die': function(beforeExit, assert) {
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
    assert.includes([1,2,3,4,5,6,7,8,9,10], Die.roll());
  },
  'test roll pool': function(beforeExit, assert) {
    var pool = new Pool(7);

    assert.type(pool.roll().successes, 'number');
  },
  'test chance roll': function(beforeExit, assert) {
    var pool = new Pool(-1);

    assert.type(pool.roll().successes, 'number');
  },
  'test weak roll': function(beforeExit, assert) {
    var pool = new Pool(10).isWeak();

    assert.type(pool.roll().successes, 'number');
  },
  'test roll reroll 9': function(beforeExit, assert) {
    var pool = new Pool(10).reroll(9);

    assert.type(pool.roll().successes, 'number');
  }
};