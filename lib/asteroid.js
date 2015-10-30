(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  generateRadius = function () {
    return Math.random() * (100 - 50) + 50;
  };

  var Asteroid = Asteroids.Asteroid = function ( obj, game ){
    obj.color = "#FF4000";
    obj.radius = 35;
    obj.game = game;
    Asteroids.MovingObject.call(this, obj);
  };


  Asteroid.RADIUS = 35;
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = "./images/asteroid.png";

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
  Asteroid.prototype.draw = function (ctx) {

  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.drawImage(Asteroid.IMAGE, -Asteroid.RADIUS, -Asteroid.RADIUS,
                    Asteroid.RADIUS * 2, Asteroid.RADIUS * 2);
  ctx.restore();
};

})();
