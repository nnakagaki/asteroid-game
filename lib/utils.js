(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = function () {

  };

  Util.prototype.inherits = function(underClass, superClass){
    var surrogate = function (){};
    surrogate.prototype = superClass.prototype;
    underClass.prototype = new surrogate();
  };

  Util.prototype.randomVec = function () {
    var xdir = (Math.random() * 5) - 2.5;
    var ydir = (Math.random() * 5) - 2.5;

    return [xdir, ydir];
  };

  Util.prototype.wrap = function (pos, dim) {
    var x = (pos[0] + dim[0]) % dim[0];
    var y = (pos[1] + dim[1]) % dim[1];

    return [x, y];
  };

  Asteroids.Util = new Util();


})();