(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MoO = Asteroids.MovingObject = function (pos, vel, radius, color, curDir){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.absRadius = radius;
    this.color = color;
    this.randColor = Math.floor(Math.random() * 30);
    if (this instanceof Asteroids.Ship) {
      this.curDir = curDir;
    } else {
      this.curDir = 0;
    }
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

    if (this instanceof Asteroids.Ship) {
      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        this.curDir - 1,
        this.curDir + 1,
        false
              );
      ctx.fillStyle = "blue";
      ctx.fill();
    }
  };

  MoO.prototype.move = function (dim) {
    if (this instanceof Asteroids.Ship) {
      this.vel[0] = this.speed * Math.cos(this.curDir);
      this.vel[1] = this.speed * Math.sin(this.curDir);
    }

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