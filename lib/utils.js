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

  Util.prototype.drawText = function (fontSize, alignment, color, message, msgPos) {
    ctx.font = fontSize + "pt sans-serif"
    ctx.textAlign = alignment;
    ctx.fillStyle = color;
    ctx.fillText(message, msgPos[0], msgPos[1])
  };

  Util.prototype.bounce = function (obj1, obj2) {
    var m1 = obj1.radius * obj1.radius;
    var m2 = obj2.radius * obj2.radius;
    var vel1 = 0
  };

  Asteroids.Util = new Util();


})();
