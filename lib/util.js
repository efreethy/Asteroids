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


  Util.calculateDeflectionVelocity = function (shieldPos, asteroid) {
    var v = [asteroid.pos[0] - shieldPos[0], asteroid.pos[1] - shieldPos[1]];
    var u = asteroid.vel;
    var factor = ((u[0]*v[0])+(u[1]*v[1]))/ ((v[0]*v[0])+(v[1]*v[1]));
    var projection = [v[0] * factor, v[1] * factor];
    var newVel = [u[0] - (2 * projection[0] ), u[1] - (2*projection[1])];
    var norm = Math.sqrt(newVel[0]*newVel[0]+newVel[1]*newVel[1]) ;
    return [ (newVel[0]/norm) * 8, newVel[1] / norm * 8];
  };

})();
