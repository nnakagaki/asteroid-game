Asteroids.Music.gameAudio1 = new Audio("music/test.mp3");
Asteroids.Music.gameAudio2 = new Audio("music/the-island-madeon-remix.mp3");
Asteroids.Music.menuAudio = new Audio("music/menu.mp3");

Asteroids.Music.menuAudio.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);