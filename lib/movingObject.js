(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
  };


  MovingObject.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.radius !== 2) {
      this.pos = this.game.wrap(this.pos);
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var sumRadii = this.radius + otherObject.radius;
    var xDist = (this.pos[0] - otherObject.pos[0]);
    var yDist = (this.pos[1] - otherObject.pos[1]);
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);

    if (dist < sumRadii){
      //this.collideWith(this, otherObject);
      return true;
    }else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function (ast1 , ast2){

  };

  MovingObject.prototype.draw = function (ctx) {

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

  };


})();
