(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var AsteroidView = Asteroids.GameView = function (ctx, canvasHeight, canvasWidth) {
    this.game = new Asteroids.Game(canvasWidth, canvasHeight);
    this.ctx = ctx;
    this.setupPauseListener();
  };

  AsteroidView.prototype.bindKeyHandlers = function () {
    key('space', function(){
      bullet = ast.game.ship.fireBullet();
      ast.game.bullets.push(bullet);
      ast.game.shotsFired += 1;
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
      ast.game.shotsFired += 1;
    };
  };

  AsteroidView.prototype.setupPauseListener = function() {
    var that = this;

    $('.restart').toggleClass('paused');
    $(".restart.paused").on("click", function () {
       if ($('div.score.gameover').length !== 0) {
         $('div.score').toggleClass('gameover');
         $('.main-menu').toggleClass('paused');
       }
      $('.main-menu').toggleClass('paused');
      $('.restart').toggleClass('paused');
      ast.game = new Asteroids.Game(canvasWidth, canvasHeight);
      that.currGameAudio.pause();
      that.currGameAudio.src = that.currGameAudio.src;
      that.currGameAudio = Asteroids.Music.gameAudio1;
      that.currGameAudio.play();
      ast.start();
    });
    $('.restart').toggleClass('paused');

    $('.main-menu').toggleClass('paused');
    $(".main-menu.paused").on("click", function () {
      $('.main-menu').toggleClass('paused');
      $('.restart').toggleClass('paused');

      $("canvas").toggleClass("playtime");
      $("main").toggleClass("playtime");
      that.currGameAudio.pause();
      that.currGameAudio.currentTime = 0;
      Asteroids.Music.menuAudio.play();
      key.unbind('space, esc, p');
    });
    $('.main-menu').toggleClass('paused');
  };

  AsteroidView.prototype.start = function () {
    this.counter = 0;
    var that = this;
    var hyp, a;

    that.modeLoopID = window.setInterval(function () {
      if (that.game.score > 1000 && that.game.mode !== 1) {
        that.currGameAudio.pause();
        that.currGameAudio.src = that.currGameAudio.src;
        that.currGameAudio = Asteroids.Music.gameAudio2;
        that.currGameAudio.play();
        that.game.mode = 1;
        that.game.bgImg = Asteroids.Images.gameMode2;
        that.game.bgCache = Asteroids.CacheCanvas.gameMode2;
        that.game.addHugeAsteroid();
        $("main").addClass("mode2");
        window.clearInterval(that.modeLoopID);
      }
    })


    this.intID = window.setInterval(function () {

      if (that.game.mode === 1) {
        var musicTime = that.currGameAudio.currentTime;
        if (musicTime > 9.4 && musicTime < 24.8) {
          var size = 120 - Math.floor((Math.floor(musicTime * 1000 + 250) % 479)/10);
          ast.game.asteroids.forEach( function (asteroid) {
            asteroid.color = "rgb("+(size+50+asteroid.randColor)+",0,"+ (255-size-asteroid.randColor) + ")";
            asteroid.radius = asteroid.absRadius * size/100;
          });
        } else if (musicTime > 24.8) {
          var musicMod = Math.floor(musicTime * 1000 + 250) % 479;
          var size = 120 - Math.floor(musicMod/10);
          var speed = musicMod/150;
          ast.game.asteroids.forEach( function (asteroid) {
            asteroid.color = "rgb(0,"+(size+50+asteroid.randColor)+","+ (255-size-asteroid.randColor) + ")";
            asteroid.radius = asteroid.absRadius * size/100;
            var xVel = asteroid.pos[0] > that.game.ship.pos[0] ? -speed : speed;
            var yVel = asteroid.pos[1] > that.game.ship.pos[1] ? -speed : speed;
            asteroid.vel = [xVel, yVel];
          });

          if (musicTime > 42) {
            if ((that.game.bossAsteroid.length !== 0) && (that.game.bossAsteroid[0].life > 0)) {
              var xVel = that.game.bossAsteroid[0].pos[0] > that.game.ship.pos[0] ? -1 : 1;
              var yVel = that.game.bossAsteroid[0].pos[1] > that.game.ship.pos[1] ? -1 : 1;
              that.game.bossAsteroid[0].vel = [xVel, yVel];
              that.game.bossAsteroidActive = true;
            }
          }
        }
      }

      if (key.isPressed('w')) {
        that.game.ship.power(0.75)
      }
      if (key.isPressed('s')) {
        that.game.ship.power(-0.75)
      }

      hyp = Math.sqrt(Math.pow((that.game.ship.pos[0]-tempX),2)+Math.pow((that.game.ship.pos[1]-tempY),2));
      a = (tempX - that.game.ship.pos[0])/hyp;
      if (tempY - that.game.ship.pos[1] > 0) {
        that.game.ship.curDir = Math.acos(a);
      } else {
        that.game.ship.curDir = Math.asin(a) - Math.PI/2;
      }

      that.varyShipSpeed(hyp);

      if (that.currGameAudio.currentTime < 38 || that.game.mode !== 1) {
        that.game.addAsteroid();
      }

      that.game.moveObjects();

      that.game.draw(that.ctx, that.game.mode, that.currGameAudio.currentTime);
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
    if (hyp < 15) {
      this.game.ship.speed = 0;
    } else if (hyp < 40) {
      this.game.ship.speed *= 0.5;
    } else if (hyp < 90) {
      this.game.ship.speed *= 0.75;
    } else if (hyp < 200) {
      this.game.ship.speed *= 0.9;
    } else {
      this.game.ship.speed *= 0.95;
    }
  };

  AsteroidView.prototype.closeGame = function () {
    console.log("closing game")

    if (typeof this.intID !== "undefined") {
      window.clearInterval(this.intID);
    }

    this.currGameAudio.pause();
    this.currGameAudio.src = this.currGameAudio.src;

    this.game = new Asteroids.Game(canvasWidth, canvasHeight);
    $('.main-menu').removeClass('paused');
    $('.restart').removeClass('paused');
    $("canvas").removeClass("playtime");
    $("main").removeClass("playtime");
    key.unbind('space, esc, p');
  };


})();
