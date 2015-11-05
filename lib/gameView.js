(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, canvasEl){
    this.game = game;
    this.canvasEl = canvasEl;
  };

  GameView.prototype.newGame = function() {

      this.game = new Asteroids.Game(window.innerWidth, window.innerHeight, 50);
    
    this.game.receiveGameView(this);
    this.start();
  };

  GameView.prototype.welcome = function(canvasEl){
    this.ctx = canvasEl.getContext("2d");
    this.game.drawInstructions(this.ctx);
    this.bindKeyHandlers();
    this.welcomeInterval = setInterval(function () {
      this.game.drawWelcome(this.ctx);
    }.bind(this), 20);

    this.bindEnterHandler(true);
  };
  GameView.prototype.start = function(){
   clearInterval(this.welcomeInterval);


     this.intervalId = setInterval(function () {
       this.game.step.bind(this.game)();
       this.game.draw.bind(this.game)(this.ctx);
     }.bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.intervalId);
    this.bindEnterHandler();
  };

  GameView.prototype.bindEnterHandler = function(welcome) {
    $(window).off("keydown keyup");
    $(window).on("keydown", this.handleEnter.bind(this, welcome));
  };

  GameView.prototype.handleEnter = function(welcome) {
    if (event.keyCode === 13) {
      if (welcome) {
        if (!this.intervalId) {
          this.start();
       }
      } else {
          this.newGame();
      }
    }
  };

  GameView.prototype.startGame = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
    setInterval((function() {

      this.game.step.bind(this.game)();
      this.game.draw.bind(this.game)(ctx);
    }).bind(this), 20);

  };

  GameView.prototype.bindKeyHandlers = function(e) {
    $(window).on("keyup", this.handleKeyUp.bind(this));
    var that = this;
    key('up', function(){
      var vec = [0, -.5];
      that.game.ship.power();
    });
    key('left', function(){
      // var vec = [-.5, 0];
      that.game.ship.rotate(-1);
    });
    key('down', function(){
      // var vec = [0, .5];
      that.game.ship.ceasePower();

    });
    key('right', function(){
      // var vec = [0.5, 0];
      that.game.ship.rotate(1);
    });
    key('f', function(){
      that.game.ship.fireBullet();
    });

  };

  GameView.prototype.handleKeyUp = function (event) {
    switch (event.keyCode) {
      case 87: case 38: // w or up
        this.game.ship.ceasePower();
        console.log("up up");
        break;
      case 37: // left
        this.game.ship.stopRotation();
        break;
      case 39: //right
        this.game.ship.stopRotation();
        break;
    }
  };



})();
