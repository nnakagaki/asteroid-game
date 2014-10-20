(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof window.Asteroids.Music === "undefined") {
    window.Asteroids.Music = {};
  }

  Asteroids.Music.visualize = function(audio) {

    audio.addEventListener("play", initMp3Player, false);

    function initMp3Player(){
      var context = new AudioContext();
      var analyser = context.createAnalyser();
      var canvas = $('#analyser_render')[0];
      canvas.width = 2000;
      canvas.height = $('main').height();
      var ctx = canvas.getContext('2d');
      console.log(ctx)
      var source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);
      frameLooper(analyser, ctx, canvas); }

    function frameLooper(analyser, ctx, canvas){ 
      requestID = window.requestAnimationFrame(frameLooper.bind(null, analyser, ctx, canvas));
      var fbc_array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(fbc_array);
      $('#analyser_render').height($("main").height() - 350)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var bars = 100;
      for (var i = 0; i < bars; i++) { 
        ctx.fillStyle = '#00CCFF';
        var bar_x = i * Math.ceil(canvas.width/bars);
        var bar_width = Math.ceil(canvas.width/bars) - 6;
        var bar_height = -(fbc_array[i] * (Math.sqrt(($('#analyser_render').height())) / 10));
        if (tempX > Math.floor(i * $('#analyser_render').width()/bars) && tempX < Math.floor((i+1) * $('#analyser_render').width()/bars)) {
          ctx.fillStyle = '#2EFE2E';
        }

        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }
  };

})();