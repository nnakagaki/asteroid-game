var IE = document.all?true:false

if (!IE) document.captureEvents(Event.MOUSEMOVE)
document.onmousemove = getMouseXY;

var tempX = 0;
var tempY = 0;

function getMouseXY(e) {
  if (IE) { // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft - window.innerWidth * 0.1;
    tempY = event.clientY + document.body.scrollTop - window.innerHeight * 0.1;
  } else {  // grab the x-y pos.s if browser is NS
    tempX = e.pageX - window.innerWidth * 0.1;
    tempY = e.pageY - window.innerHeight * 0.1;
  }
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}
  return true
}
