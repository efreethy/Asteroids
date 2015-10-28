(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game){
    this.game = game;
  };


  GameView.prototype.welcome = function(canvasEl){
    this.ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
    this.welcomeInterval = setInterval(function () {
      this.game.drawWelcome(this.ctx);
    }.bind(this), 20);

    this.bindEnterHandler(true);
  };
  GameView.prototype.start = function(canvasEl){
   clearInterval(this.welcomeInterval);

   this.intervalId = setInterval(function () {
     this.game.step.bind(this.game)();
     this.game.draw.bind(this.game)(this.ctx);
   }.bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindEnterHandler = function(welcome) {
    $(window).off("keydown keyup");
    $(window).on("keydown", this.handleEnter.bind(this, welcome));
  };

  GameView.prototype.handleEnter = function(welcome) {
    if (event.keyCode === 13) {
      if (welcome) {
        this.start();
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

  },

  GameView.prototype.bindKeyHandlers = function(e) {

    var that = this;
    key('up', function(){
      var vec = [0, -.5];

      that.game.ship.power(vec);
    });
    key('left', function(){
      var vec = [-.5, 0];
      that.game.ship.power(vec);
    });
    key('down', function(){
      var vec = [0, .5];
      that.game.ship.power(vec);
    });
    key('right', function(){
      var vec = [0.5, 0];
      that.game.ship.power(vec);
    });
    key('f', function(){
      that.game.ship.fireBullet();
    });

  };



})();
