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

  Asteroid.RADIUS = 20;
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = "./images/asteroid.png";

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  // Asteroid.prototype.draw = function (ctx) {
  //   var asteroidImage = document.getElementById("asteroid");
  //   ctx.drawImage(asteroidImage, this.pos[0], this.pos[1], 50, 50);
  // };

  Asteroid.prototype.draw = function (ctx) {
  // Rotation adapted from http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.drawImage(Asteroid.IMAGE, -Asteroid.RADIUS, -Asteroid.RADIUS,
                    Asteroid.RADIUS * 2, Asteroid.RADIUS * 2);
  ctx.restore();
};

})();
