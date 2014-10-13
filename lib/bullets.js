(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, 3, "red");
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


})();