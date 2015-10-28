(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function ( obj, game ){
    obj.color = "#FF4000";
    obj.radius = 20;
    obj.game = game;
    Asteroids.MovingObject.call(this, obj);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  // Asteroid.prototype.draw = function (ctx) {
  //   var asteroidImage = document.getElementById("asteroid");
  //   ctx.drawImage(asteroidImage, this.pos[0], this.pos[1], 50, 50);
  // };

})();
