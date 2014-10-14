(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (pos) {
    this.vel = [0, 0];
    Asteroids.MovingObject.call(this, pos, this.vel, 15, "red", 0);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse * Math.cos(this.curDir);
    this.vel[1] += impulse * Math.sin(this.curDir);
  };

  Ship.prototype.tilt = function (impulse) {
    this.curDir += impulse;
  };

  Ship.prototype.fireBullet = function () {
    var bulletSpeed = 20;

    var xVel = 20 * Math.cos(this.curDir);
    var yVel = 20 * Math.sin(this.curDir);

    // if (this.vel[0] === 0 && this.vel[1] === 0 ){
 //      var xVel = bulletSpeed;
 //      var yVel = 0;
 //    } else {
 //      var xVel = bulletSpeed * this.vel[0] / Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
 //      var yVel = bulletSpeed * this.vel[1] / Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
 //    }

    return new Asteroids.Bullet(this.pos, [xVel, yVel] );
  };

})();