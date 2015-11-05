(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Shield = Asteroids.Shield = function (game){
    var obj = {};
    obj.color = "#00FFFF";
    obj.radius = 55;
    obj.game = game;
    obj.pos = game.ship.pos;
    obj.vel = [0,0];
    Asteroids.MovingObject.call(this, obj);



    setTimeout(function () {
      this.game.shield = [];
      this.game.ship.invincible = false;
    }.bind(this), 2000);
  };

  Shield.RADIUS = 55;
  Shield.IMAGE = new Image();
  Shield.IMAGE.src = "./images/shield.png";

  Asteroids.Util.inherits(Shield, Asteroids.MovingObject);

  Shield.prototype.draw = function (ctx) {
  // Rotation adapted from http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate((this.dir + 90) * (Math.PI/180));
  ctx.drawImage(Shield.IMAGE, -Shield.RADIUS, -Shield.RADIUS,
                    Shield.RADIUS * 2, Shield.RADIUS * 2);
  ctx.restore();
  };

})();
