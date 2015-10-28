(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (game){
    var obj = {};
    obj.color = "#00FFFF";
    obj.radius = 8;
    obj.game = game;
    obj.pos = game.ship.pos.slice();
    obj.vel = game.ship.vel.slice().map(function(el){
      return ((el * 4));
    });
    Asteroids.MovingObject.call(this, obj);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  // Bullet.prototype.draw = function (ctx) {
  //   var bulletImage = document.getElementById("bullet");
  //   ctx.drawImage(bulletImage, this.pos[0], this.pos[1], this.radius, this.radius);
  // };
})();
