(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var AsteroidView = Asteroids.GameView = function (ctx, canvasHeight, canvasWidth) {
    this.game = new Asteroids.Game(canvasWidth, canvasHeight);
    this.ctx = ctx;
    this.bindKeyHandlers();
    this.setupPauseListener();
  };

  AsteroidView.prototype.bindKeyHandlers = function () {
    key('space', function(){
      bullet = ast.game.ship.fireBullet();
      ast.game.bullets.push(bullet);
    });

    key('esc, p', function(){
      if (ast.game.gameover !== true) {
        if (ast.counter === 0){
          ast.counter = 1;
          $('.restart').toggleClass('paused');
          $('.main-menu').toggleClass('paused');
          window.clearInterval(ast.intID);

          ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          Asteroids.Util.drawText(Math.ceil(canvasHeight/6),
                  'center',
                  'blue',
                  'PAUSED',
                  [canvasWidth/2, canvasHeight/2 + canvasHeight/12]);
        } else {
          $('.restart').toggleClass('paused');
          $('.main-menu').toggleClass('paused');
          ast.start();
        }
      }
    });

    document.body.onmousedown = function () {
      bullet = ast.game.ship.fireBullet();
      ast.game.bullets.push(bullet);
    };
  };

  AsteroidView.prototype.setupPauseListener = function() {
    $('.restart').toggleClass('paused');
    $(".restart.paused").on("click", function () {
      $('.main-menu').toggleClass('paused');
      $('.restart').toggleClass('paused');
      ast.game = new Asteroids.Game(canvasWidth, canvasHeight);
      ast.start();
    });
    $('.restart').toggleClass('paused');

    $('.main-menu').toggleClass('paused');
    $(".main-menu.paused").on("click", function () {
      $('.main-menu').toggleClass('paused');
      $('.restart').toggleClass('paused');

      $("canvas").toggleClass("playtime");
      $("main").toggleClass("playtime");
      // Asteroids.Music.visualize(menuAudio);
      gameAudio.pause();
      gameAudio.currentTime = 0;
      menuAudio.play();
    });
    $('.main-menu').toggleClass('paused');
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
        ast.game.ship.power(0.75)
      }
      if (key.isPressed('s')) {
        ast.game.ship.power(-0.75)
      }

      var hyp = Math.sqrt(Math.pow((that.game.ship.pos[0]-tempX),2)+Math.pow((that.game.ship.pos[1]-tempY),2));
      var a = (tempX - that.game.ship.pos[0])/hyp;
      if (tempY - that.game.ship.pos[1] > 0) {
        that.game.ship.curDir = Math.acos(a);
      } else {
        that.game.ship.curDir = Math.asin(a) - Math.PI/2;
      }

      that.varyShipSpeed(hyp);

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

    console.log("goingggg")

    }, 20);
  };

  AsteroidView.prototype.varyShipSpeed = function (hyp) {
    if (hyp < 30) {
      this.game.ship.speed = 0;
    } else if (hyp < 50) {
      this.game.ship.speed *= 0.5;
    } else if (hyp < 100) {
      this.game.ship.speed *= 0.75;
    } else if (hyp < 200) {
      this.game.ship.speed *= 0.9;
    } else {
      this.game.ship.speed *= 0.95;
    }
  };


})();