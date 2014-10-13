(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MoO = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }

  MoO.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
            );
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  MoO.prototype.move = function (dim) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (!(this instanceof Asteroids.Bullet)) {
      this.pos = Asteroids.Util.wrap(this.pos, dim);
    }
  };

  MoO.prototype.isCollidedWith = function (otherObject) {
    dist = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
                     Math.pow(this.pos[1] - otherObject.pos[1], 2));

    if (dist > this.radius + otherObject.radius) {
      return false;
    } else {
      return true;
    }
  };

})();