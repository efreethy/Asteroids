(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(obj, game) {
    obj.color = "#0000FF";
    obj.radius = 10;
    obj.vel = [0,0];
    obj.game = game;
    this.dir = -90;
    Asteroids.MovingObject.call(this, obj);
  };

  Ship.RADIUS = 10;
  Ship.IMAGE = new Image();
  Ship.IMAGE.src = "./images/spaceship.png";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = [this.game.DIM_X/2 , this.game.DIM_Y/ 2];
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    if (!this.powerInterval) {
      Ship.IMAGE.src = "./images/spaceship_thrust.png";
      this.powerInterval = setInterval(this.increasePower.bind(this), 20);
    }
  };
  Ship.prototype.ceasePower = function(impulse) {
    Ship.IMAGE.src = "./images/spaceship.png";
    clearInterval(this.powerInterval);
    this.powerInterval = null;
  };

  Ship.prototype.increasePower = function () {
    var powerMagnitude = 0.13;
    var vector = Asteroids.Util.getVectors(this.dir);
    this.vel[0] += vector[0] * powerMagnitude;
    this.vel[1] += vector[1] * powerMagnitude;
  };


  Ship.prototype.fireBullet = function() {
    var dirVector = Asteroids.Util.getVectors(this.dir);
    var velMultiplier = 5;
    var velX = dirVector[0] * velMultiplier;
    var velY = dirVector[1] * velMultiplier;
    var bullet = new Asteroids.Bullet(this.game, [velX, velY]);
    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function (ctx) {
  // Rotation adapted from http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate((this.dir + 90) * (Math.PI/180));
  ctx.drawImage(Ship.IMAGE, -Ship.RADIUS, -Ship.RADIUS,
                    Ship.RADIUS * 2, Ship.RADIUS * 2);
  ctx.restore();
};

  Ship.prototype.rotate = function (val) {

    if (!this.rotationInterval) {
      this.rotationInterval = setInterval(function () {
        var rotationMagnitude = 7;
        this.dir += (val * rotationMagnitude);
      }.bind(this), 20);
    }
  };

  Ship.prototype.stopRotation = function (val) {
    clearInterval(this.rotationInterval);
     this.rotationInterval = null;
  };





})();
