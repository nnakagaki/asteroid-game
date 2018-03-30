(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (DIMX, DIMY) {
    this.dimX               = DIMX;
    this.dimY               = DIMY;
    this.asteroids          = [];
    this.bullets            = [];
    this.score              = 0;
    this.lives              = 5;
    this.mode               = 0;
    this.asteroidsDestroyed = 0;
    this.shotsFired         = 0;
    this.bossAsteroid       = [];
    this.bossAsteroidActive = false;
    this.bgImg              = Asteroids.Images.menu;
    this.bgCache            = Asteroids.CacheCanvas.menu;

    this.makeShip();
  }

  Game.prototype.makeShip = function () {
    this.ship = new Asteroids.Ship([this.dimX/2, this.dimY/2]);
  };

  Game.prototype.addAsteroid = function () {
    if (this.asteroids.length < 20 + Math.floor(this.score/1000)) {
      var ast = new Asteroids.Asteroid (this.randomPosition());
      this.asteroids.push(ast);
    }
  };

  Game.prototype.addHugeAsteroid = function () {
    var ast = new Asteroids.HugeAsteroid();
    this.bossAsteroid.push(ast);

    // var ast = new Asteroids.Asteroid ([360, 200]);
    // ast.radius = 680;
    // ast.vel = [0,0];
    // var opacity = 0;
    // var that = this;
    // var intervalID = setInterval(function () {
    //   opacity += 0.005
    //   ast.color = "rgba(0,40,255," + opacity + ")"
    //   console.log(opacity)
    //   if (opacity > 1) {
    //     that.bossAsteroidActive = true;
    //     clearInterval(intervalID);
    //   }
    // }, 20);

    // this.bossAsteroid = ast;
  };

  Game.prototype.randomPosition = function () {
    var x,y;
    var sideInd = Math.floor(Math.random() * 3.999);
    switch (sideInd) {
    case 0:
      x = 0; y = Math.random() * this.dimY;
      break;
    case 1:
      x = this.dimX; y = Math.random() * this.dimY;
      break;
    case 2:
      y = 0; x = Math.random() * this.dimX;
      break;
    case 3:
      y = this.dimY; x = Math.random() * this.dimX;
      break;
    };

    return [x,y];
  };

  Game.prototype.draw = function (ctx, gameMode, musicTime) {
    ctx.clearRect(0,0,this.dimX,this.dimY);

    var adjustRatio = this.dimX/this.bgImg.width;
    // ctx.drawImage(this.bgImg, 0, 0, this.dimX, this.bgImg.height*adjustRatio);
    ctx.drawImage(this.bgCache,0,0);
    var allMoOs = this.bossAsteroid.concat(this.asteroids).concat(this.ship).concat(this.bullets);

    for(var i in allMoOs) {
      allMoOs[i].draw(ctx, adjustRatio, gameMode, musicTime);
    }
  };

  Game.prototype.moveObjects = function () {
    var allMoOs = this.asteroids.concat(this.ship).concat(this.bullets).concat(this.bossAsteroid);

    for(var i in allMoOs) {
      allMoOs[i].move([this.dimX, this.dimY]);
    }
  };

  Game.prototype.removeAstBull = function (ast_ind, bull_ind) {
    this.asteroids.splice(ast_ind, 1);
    this.bullets.splice(bull_ind, 1);
    this.score += 100;
    this.asteroidsDestroyed += 1;
  };

  Game.prototype.removeShip = function () {
    this.ship = [];
    this.lives -= 1;
  };

  Game.prototype.outOfBounds = function (index) {
    var bp = this.bullets[index].pos;
    var astSize = 2 * (this.dimX * 9/8 + 10);
    if (bp[0] < -astSize || bp[0] > astSize || bp[1] < -astSize || bp[1] > astSize) {
      this.bullets.splice(index, 1);
      this.score -= 10;
      return true;
    }
  };

  Game.prototype.collisionCheck = function() {
    var currAsteroids = this.asteroids
    if (this.bossAsteroidActive) {
      currAsteroids = currAsteroids.concat(this.bossAsteroid)
    }

    if (this.ship.invincible > 0) {
      this.ship.invincible -= 1;
      if (this.ship.invincible === 0) {
        this.ship.color = "rgb(255,0,0)"
      }
    }

    for (var i in currAsteroids) {
      if (this.ship.invincible > 0) {
        this.ship.color = "rgba(255,0,255,0.5)"
      } else {
        if (currAsteroids[i].isCollidedWith(this.ship)) {
          this.removeShip();
          this.makeShip();

          var that = this;
          if (this.lives < 0) {
            $('div.score').toggleClass('transition');
            $('div.score').on('transitionend', function () {
              $('.restart').addClass('paused');
              $('div.score li.final-score').html("Score: " + that.score);
              $('div.score li.shots-fired').html("Shots Fired: " + that.shotsFired);
              $('div.score li.asteroids-destroyed').html("Asteroids Destroyed: " + that.asteroidsDestroyed);
              $('div.score li').toggleClass('gameover');
            })
            setTimeout(function () {
              $('div.score').toggleClass('gameover');
              $('div.score').toggleClass('transition');
            }, 1000)



            this.gameover = true;

            window.clearInterval(ast.intID);
            ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            Asteroids.Util.drawText(Math.ceil(canvasHeight/6),
                      'center',
                      'red',
                      'GAME OVER',
                      [canvasWidth/2, canvasHeight/2 + canvasHeight/12]);
          }
        }
      }

      for (var j in this.bullets) {
        if(!this.outOfBounds(j)){
          if (currAsteroids[i].isCollidedWith(this.bullets[j])) {
            if (currAsteroids[i].name === "boss") {
              this.bullets.splice(j, 1);

              currAsteroids[i].life -= 1;
              currAsteroids[i].red -= 10;
              currAsteroids[i].green += 10;

              if (currAsteroids[i].life < 0) {
                this.bossAsteroidActive = false;

                var that = this;
                bossDestID = window.setInterval(function () {
                  currAsteroids[i].radius -= 1;
                  if (currAsteroids[i].radius < 0) {
                    that.bossAsteroid = [];
                    window.clearInterval(bossDestID);
                  }
                }, 10);
              }
            } else {
              this.removeAstBull(i, j);
            }
          }
        }
      }
    }
  };

})();
