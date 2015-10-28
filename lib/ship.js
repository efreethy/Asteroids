(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(obj, game) {
    obj.color = "#0000FF";
    obj.radius = 7;
    obj.vel = [0,0];
    obj.game = game;
    Asteroids.MovingObject.call(this, obj);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = [this.game.DIM_X/2 , this.game.DIM_Y/ 2];
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {

    var bullet = new Asteroids.Bullet(this.game);
    this.game.bullets.push(bullet);
  };

  // Ship.prototype.draw = function (ctx) {
  //   var shipImage = document.getElementById("ship");
  //   ctx.drawImage(shipImage, this.pos[0], this.pos[1], 40, 30);
  // };








})();
