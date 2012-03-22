Number.prototype.trim = function(a, b) {
  var min = Math.min(a, b),
      max = Math.max(a, b);

  return Math.min(Math.max(parseInt(this, 10), min), max);
};
String.prototype.toStandard = function() {
  return this.toLowerCase().trim();
};