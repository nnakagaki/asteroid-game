(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (pos) {
    this.invincible = 50;
    this.vel = [0, 0];
    this.speed = 0;
    Asteroids.MovingObject.call(this, pos, this.vel, 15, "red", 0);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.speed += impulse
    this.vel[0] = this.speed * Math.cos(this.curDir);
    this.vel[1] = this.speed * Math.sin(this.curDir);
  };

  Ship.prototype.tilt = function (impulse) {
    this.curDir += impulse;
  };

  Ship.prototype.fireBullet = function () {
    var bulletSpeed = 20;

    var xVel = 20 * Math.cos(this.curDir);
    var yVel = 20 * Math.sin(this.curDir);

    return new Asteroids.Bullet(this.pos, [xVel, yVel] );
  };

})();
