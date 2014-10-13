(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Asteroid = Asteroids.Asteroid = function (pos) {
    velocity = Asteroids.Util.randomVec();
    Asteroids.MovingObject.call(this, pos, velocity, this.RADIUS(), this.COLOR());
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.COLOR = function () {
    return "#FFFF00";
  };

  Asteroid.prototype.RADIUS = function () {
    return 10;
  };


})();