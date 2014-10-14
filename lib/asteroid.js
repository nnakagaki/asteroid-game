(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Asteroid = Asteroids.Asteroid = function (pos) {
    velocity = Asteroids.Util.randomVec();
    Asteroids.MovingObject.call(this, pos, velocity, this.randRadius(), this.randColor());
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.randColor = function () {
    return "rgb(" + Math.ceil((Math.random() * 50 + 200)) + ","
                  + Math.ceil((Math.random() * 50 + 200)) + ","
                  + Math.ceil(Math.random() * 50) + ")";
  };

  Asteroid.prototype.randRadius = function () {
    return Math.random() * canvasHeight/8 + 10;
  };


})();