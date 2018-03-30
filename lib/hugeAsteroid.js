(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var HugeAsteroid = Asteroids.HugeAsteroid = function () {
    this.name = "boss";
    this.img = Asteroids.Images.hugeAsteroid;
    this.speed = 0;
    this.adjusted = false;
    this.life = 25;
    this.red = 250;
    this.green = 0;
    Asteroids.MovingObject.call(this, [370, 210], [0, 0], 670, "red", 0);
  };

  Asteroids.Util.inherits(HugeAsteroid, Asteroids.MovingObject);

  HugeAsteroid.prototype.draw = function(ctx, adjustRatio, gameMode, musicTime) {
    if (!this.adjusted) {
      this.radius = 670 * adjustRatio;
      this.adjustedRadius = this.radius;
      this.pos = [370*adjustRatio, 210*adjustRatio];
      this.adjusted = true;
    }

    var posDiffX = 370*adjustRatio - this.pos[0];
    var posDiffY = 210*adjustRatio - this.pos[1];

    // var hugeAsteroidRotate = document.createElement('canvas');
    //     hugeAsteroidRotate.setAttribute('height', 1571);
    //     hugeAsteroidRotate.setAttribute('width', 1581);
    // var context = hugeAsteroidRotate.getContext('2d');
    //     context.save();
    //     context.translate(1571, 1581);
    //     context.rotate(Math.PI);
    // var image = Asteroids.Images.hugeAsteroid;
    //     context.drawImage(image,0,0,1581,1571);
    //     context.restore();

    var radiusDiff = this.adjustedRadius - this.radius;
    console.log(radiusDiff)

    ctx.drawImage(Asteroids.CacheCanvas.hugeAsteroid, (-422)*adjustRatio - posDiffX + radiusDiff,
                            (-575)*adjustRatio - posDiffY + radiusDiff,
                            1581*adjustRatio - 2*radiusDiff,
                            1571*adjustRatio - 2*radiusDiff);
    if (gameMode === 1 && musicTime > 38) {
      var opacity, opacity2;

      if (musicTime < 42) {
        opacity = (musicTime - 38)/10;
        opacity2 = (musicTime - 38)/13.333;
      } else {
        opacity = 0.4;
        opacity2 = 0.3;
      }

      ctx.beginPath();
      var gradient = ctx.createRadialGradient(this.pos[0], this.pos[1], 0, this.pos[0], this.pos[1], this.radius);
      gradient.addColorStop(0, 'rgba('+this.red+','+this.green+',0,'+opacity+')');
      gradient.addColorStop(0.90, 'rgba('+this.red+','+this.green+',0,'+opacity2+')');
      gradient.addColorStop(0.98, 'rgba('+this.red+','+this.green+',0,0)');
      gradient.addColorStop(1, 'rgba('+this.red+','+this.green+',0,0)');
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
              );
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  };
})();
