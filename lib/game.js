(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (DIMX, DIMY) {
    this.dimX = DIMX;
    this.dimY = DIMY;
    this.asteroids = [];
    this.bullets = [];
    this.makeShip();
    this.score = 0;
    this.lives = 5;
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

  Game.prototype.draw = function (ctx, img) {
    ctx.clearRect(0,0,this.dimX,this.dimY);
    ctx.drawImage(img, 0, 0);

    var allMoOs = this.asteroids.concat(this.ship).concat(this.bullets);

    for(var i in allMoOs) {
      allMoOs[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    var allMoOs = this.asteroids.concat(this.ship).concat(this.bullets);

    for(var i in allMoOs) {
      allMoOs[i].move([this.dimX, this.dimY]);
    }
  };

  Game.prototype.removeAstBull = function (ast_ind, bull_ind) {
    this.asteroids.splice(ast_ind, 1);
    this.bullets.splice(bull_ind, 1);
    this.score += 100;
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
    for (var i in this.asteroids) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.removeShip();
        this.makeShip();
        if (this.lives < 0) {
          $('.restart').toggleClass('paused');

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

      for (var j in this.bullets) {
        if(!this.outOfBounds(j)){
          if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
            this.removeAstBull(i, j);
          }
        }
      }
    }
  };

})();