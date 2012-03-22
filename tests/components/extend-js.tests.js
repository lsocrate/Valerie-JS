require('../../components/extend-js');
module.exports = {
  'test Number.trim()': function(beforeExit, assert) {
    var number  = -20;
    var number2 = 7;
    var number3 = 30;

    assert.equal(number.trim(1, 10), 1);
    assert.equal(number2.trim(1, 10), 7);
    assert.equal(number3.trim(1, 10), 10);
  },
  'test String.toStandard()': function(beforeExit, assert) {
    var string1  = "JaboTiCaBa";
    var string2  = "alface";

    assert.equal(string1.toStandard(), "jaboticaba");
    assert.equal(string2.toStandard(), "alface");
  }
};