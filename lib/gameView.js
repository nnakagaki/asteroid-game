(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var AsteroidView = Asteroids.GameView = function (ctx, canvasHeight, canvasWidth) {
    var game = new Asteroids.Game(canvasWidth, canvasHeight);
    this.game = game;
    this.ctx = ctx;
    this.bindKeyHandlers();
  };

  AsteroidView.prototype.bindKeyHandlers = function () {
    // key('up, w', function(){ ast.game.ship.power(1) });
    // key('down, s', function(){ ast.game.ship.power(-1) });
    key('left, a', function(){ ast.game.ship.tilt(0.3) });
    key('right, d', function(){ ast.game.ship.tilt(-0.3) });

    key('space', function(){
      bullet = ast.game.ship.fireBullet();
      ast.game.bullets.push(bullet);
    });

    key('esc, p', function(){
      if (ast.counter === 0){
        ast.counter = 1;
        window.clearInterval(ast.intID);
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        Asteroids.Util.drawText(Math.ceil(canvasHeight/4),
                  'center',
                  'blue',
                  'PAUSED',
                  [canvasWidth/2, canvasHeight/2 + canvasHeight/8]);
      } else {
        ast.start();
      }
    });

    document.body.onmousedown = function () {
      bullet = ast.game.ship.fireBullet();
      ast.game.bullets.push(bullet);
    };
  };

  AsteroidView.prototype.start = function () {
    this.counter = 0;
    var that = this;

    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'pics/outer-space.jpg';

    this.intID = window.setInterval(function () {

    if (key.isPressed('w')) {
      ast.game.ship.power(0.5)
    }
    if (key.isPressed('s')) {
      ast.game.ship.power(-0.5)
    }

      var hyp = Math.sqrt(Math.pow((that.game.ship.pos[0]-tempX),2)+Math.pow((that.game.ship.pos[1]-tempY),2));
      var a = (tempX - that.game.ship.pos[0])/hyp;
      if (tempY - that.game.ship.pos[1] > 0) {
        that.game.ship.curDir = Math.acos(a);
      } else {
        that.game.ship.curDir = Math.asin(a) - Math.PI/2;
      }

      that.game.addAsteroid();
      that.game.moveObjects();
      that.game.draw(that.ctx, img);
      Asteroids.Util.drawText(Math.ceil(canvasHeight/20),
                'left',
                'white',
                'Score: ' + that.game.score,
                [10, 10 + Math.ceil(canvasHeight/20)]);
      var lifeStr = "";
      for (var l = 0; l < that.game.lives; l++) {
        lifeStr += '<3';
      }
      Asteroids.Util.drawText(Math.ceil(canvasHeight/20),
                'left',
                'red',
                lifeStr,
                [10, 10 + 2.5 * Math.ceil(canvasHeight/20)]);

    that.game.collisionCheck();

    that.game.ship.speed *= 0.95;

console.log("goingggg")

    }, 20);
  };


})();