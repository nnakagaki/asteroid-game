(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof window.Asteroids.Music === "undefined") {
    window.Asteroids.Music = {};
  }

  Asteroids.Music.visualize = function (audio) {
    console.log("in audio vis")
    console.log(audio)

    var context  = new AudioContext(),
        analyser = context.createAnalyser(),
        canvas   = $('#analyser_render')[0],
        ctx,
        source,
        fbc_array,
        bars,
        bar_x,
        bar_width,
        bar_height;

    canvas.width  = 2000;
    canvas.height = $('body').height();
    ctx           = canvas.getContext('2d');
    source        = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    audio.addEventListener("play", frameLooper.bind(null, analyser, ctx, canvas), false);
    audio.addEventListener("pause", function (event) {
      window.cancelAnimationFrame(requestID)
    }, false);

    function frameLooper(analyser, ctx, canvas){
      console.log("in audio vis looper")

      requestID = window.requestAnimationFrame(frameLooper.bind(null, analyser, ctx, canvas));
      fbc_array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(fbc_array);
      $('#analyser_render').height($("body").height() * 0.9 - 350)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bars = 100;
      for (var i = 0; i < bars; i++) {
        ctx.fillStyle = '#00CCFF';
        bar_x = i * Math.ceil(canvas.width/bars);
        bar_width = Math.ceil(canvas.width/bars) - 6;
        bar_height = -(fbc_array[i] * (Math.sqrt(($('#analyser_render').height())) / 10));
        if (tempX > Math.floor(i * $('#analyser_render').width()/bars) && tempX < Math.floor((i+1) * $('#analyser_render').width()/bars)) {
          ctx.fillStyle = '#2EFE2E';
        }

        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }
  };

})();
