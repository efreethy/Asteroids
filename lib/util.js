(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (child, parent) {
    var Surrogate = function(){};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
  };

  Util.randomVec = function (length) {

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    var x  = getRandomArbitrary(-1,1) * length ;
    var y = Math.sqrt(length * length  - x * x) * getRandomArbitrary(-1,1);
    return [x, y];
  };

  Util.getVectors = function (angle) {
    var angleRad = angle * (Math.PI / 180);
    return [Math.cos(angleRad), Math.sin(angleRad)];
  };

})();
