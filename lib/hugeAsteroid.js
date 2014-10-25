(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var HugeAsteroid = Asteroids.HugeAsteroid = function () {
    this.img = new Image();
    this.img.src = 'pics/isflaksplanet.png';
    this.speed = 0;
    Asteroids.MovingObject.call(this, [370, 210], [0, 0], 670, "red", 0);
  };

  Asteroids.Util.inherits(HugeAsteroid, Asteroids.MovingObject);

  HugeAsteroid.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, (this.pos[0] - 122 - this.radius), (this.pos[1] - 115- this.radius),
                            2.36*this.radius, 2.3455*this.radius);
    ctx.beginPath();
    var gradient = ctx.createRadialGradient(this.pos[0], this.pos[1], 0, this.pos[0], this.pos[1], this.radius);
    gradient.addColorStop(0, 'rgba(255,0,0,0.4)');
    gradient.addColorStop(0.90, 'rgba(255,0,0,0.3)');
    gradient.addColorStop(0.98, 'rgba(255,0,0,0)');
    gradient.addColorStop(1, 'rgba(255,0,0,0)');
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
  };
})();