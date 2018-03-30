(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Asteroid = function (pos) {
    var velocity = Asteroids.Util.randomVec();
    Asteroids.MovingObject.call(this, pos, velocity, this.randRadius(), this.randColor());
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroids.Asteroid.prototype.randColor = function () {
    return "rgb(" + Math.ceil((Math.random() * 50 + 200)) + ","
                  + Math.ceil((Math.random() * 50 + 200)) + ","
                  + Math.ceil(Math.random() * 50) + ")";
  };

  Asteroids.Asteroid.prototype.randRadius = function () {
    return Math.random() * canvasHeight/8 + 10;
  };
})();
