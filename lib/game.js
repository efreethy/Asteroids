(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Game = Asteroids.Game = function (width, height, num) {
    this.lifeCount = 3;
    this.score = 0;
    this.DIM_X = width;
    this.DIM_Y = height;
    this.NUM_ASTEROIDS = num;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.shield = [];
    this.ship = new Asteroids.Ship({pos: [width/2 , height/ 2]}, this);
    // document.getElementById("life-count").innerText = "Life Count: " +this.lifeCount;
  };


  Game.BACKGROUND_IMG = new Image(Game.DIM_X, Game.DIM_Y);
  Game.BACKGROUND_IMG.src = './images/space4.jpg';

  Game.prototype.receiveGameView = function (gameView) {
    this.gameView = gameView;
  };

  Game.prototype.allObjects = function() {
    var all = this.asteroids.slice();
    all.push(this.ship);
    all = all.concat(this.shield);
    all = all.concat(this.bullets);
    return all;
  };

  Game.prototype.addAsteroids = function () {
     for (var i=0; i < this.NUM_ASTEROIDS; i++) {
       var obj = { pos: this.randomPosition(this.DIM_X,this.DIM_Y) , vel: Asteroids.Util.randomVec(Math.random() * (5))  };
       this.asteroids.push(new Asteroids.Asteroid(obj, this));
     }
     this.asteroidAccumInterval = setInterval(function () {
        this.asteroids.push(new Asteroids.Asteroid(
          new Asteroids.Asteroid({ pos: this.randomPosition(this.DIM_X,this.DIM_Y) , vel: Asteroids.Util.randomVec(1)  }, this), this));
     }.bind(this), 4000);
  };

  Game.prototype.randomPosition = function () {
    var randx = Math.random() * this.DIM_X;
    while (randx > this.DIM_X / 3 && randx < (2/3) * this.DIM_X) {
      randx = Math.random() * this.DIM_X;
    }
    var randy = Math.random() * this.DIM_Y;
    return [randx, randy];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(Game.BACKGROUND_IMG, 0, 0);
    this.allObjects().forEach(function (obj){
      obj.draw(ctx);
    });


    this.setCtxStyle(ctx);
    this.drawInstructions(ctx);
    this.drawLifeCount(ctx);
    this.drawScore(ctx);

    if (this.gameOver()) {
      this.shield = [];
      this.drawGameOverScreen(ctx);

    }
  };

  Game.prototype.drawGameOverScreen = function (ctx) {

    ctx.fillStyle = "rgba(0,0,0.95)";
    ctx.font="20pt 'Press Start 2P'";
    ctx.fillText("Game Over! Score: " + this.score,
                (this.DIM_X / 2)-215,
                (this.DIM_Y / 2)-10);
    ctx.fillText("Press enter to play again.",
                (this.DIM_X  / 2)-280,
                (this.DIM_Y / 2)+80);
  };

  Game.prototype.gameOver = function () {
    if (this.lifeCount < 1) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.setCtxStyle = function (context) {
    context.fillStyle = "rgba(255,255,255,0.8)";
    context.font = "28pt 'Press Start 2P'";
  };

  Game.prototype.drawInstructions = function (ctx) {
    ctx.save();
    ctx.font = "15pt 'Press Start 2P'";
    ctx.fillText("move: up/down/left/right", 20, this.DIM_Y - 40);
    ctx.fillText("Shoot: f", 20, this.DIM_Y - 15);
    ctx.restore();
  };

  Game.prototype.drawLifeCount = function(ctx) {
    ctx.save();
    ctx.fillText("Lives: " + this.lifeCount, 20, 40);
      ctx.restore();
  };
  Game.prototype.drawScore= function(ctx) {
    ctx.fillText("Score: " + this.score,  610, 40);
  };

  Game.prototype.drawWelcome = function (ctx) {

    this.draw(ctx);

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font="20pt 'Press Start 2P'";
    ctx.fillText("Welcome to Asteroids!",
                (this.DIM_X / 2)-250,
                (this.DIM_Y / 2)- 50);
    ctx.fillText("Press enter to begin.",
                (this.DIM_X  / 2)-250,
                (this.DIM_Y / 2)+70);
  };

  Game.prototype.moveObjects = function() {

    this.allObjects().forEach( function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {

    if (pos[0] < 0) {
      pos[0] = this.DIM_X + pos[0];
    } else if(pos[0] > this.DIM_X){
      pos[0] = pos[0] % this.DIM_X;
    }

    if (pos[1] < 0) {
      pos[1] = this.DIM_Y + pos[1];
    } else if(pos[1] > this.DIM_Y){
      pos[1] = pos[1] % this.DIM_Y;
    }

    return pos;
  };

  Game.prototype.checkCollisions = function () {
    var that = this;
    this.asteroids.forEach (function (asteroid){
      if (typeof that.shield[0] !== "undefined" && asteroid.isCollidedWith(that.shield[0])) {
        asteroid.collisionCount += 1;
        if (asteroid.collisionCount === 7) {
            aIdx = that.asteroids.indexOf(asteroid);
            that.asteroids.splice(aIdx, 1);
        }

        var newVel = Asteroids.Util.calculateDeflectionVelocity(that.shield[0].pos, asteroid);
        asteroid.vel = newVel;
      }

      for (var i = 0; i < that.asteroids.length; i++){
        if (that.asteroids[i].isCollidedWith(that.ship) ) {
          if (that.ship.pos[0] === this.game.DIM_X/2 && that.ship.pos[1] === this.game.DIM_Y/ 2) {
            return;
          }
          if (!that.ship.invincible) {
            that.ship.pos = [this.game.DIM_X/2 , this.game.DIM_Y/ 2];
            that.lifeCount -= 1;
          }
          that.ship.invincible = true;
          that.shield = [new Asteroids.Shield(that)];
          that.ship.vel = [0,0];


          if (that.gameOver() === true) {
            clearInterval(that.asteroidAccumInterval);
            that.gameView.stop();
          }


        }
      }
    });

    this.bullets.forEach (function (bullet){
      for (var i = 0; i < that.asteroids.length; i++){
        if (that.asteroids[i].isCollidedWith(bullet) ) {
          that.score += 15;
          bIdx = that.bullets.indexOf(bullet);
          aIdx = that.asteroids.indexOf(that.asteroids[i]);
          that.asteroids.splice(aIdx, 1);
          that.bullets.splice(bIdx, 1);
        }
      }
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  };


})();
