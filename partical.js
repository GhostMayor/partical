var canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.style.backgroundColor = 'gray'

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var ctx = canvas.getContext('2d');



class Partical{
  constructor(x,y,r,color,counter){
    this.y =0 || y;
    this.x =0 || x;
    this.r =10 || r;
    this.canvas = document.getElementById('canvas');
    this.color = color;

    this.yLim = true;
    this.xLim = true;

    this.counter = counter;
    this.move = this.move.bind(this);
  }

  move(){
    if(this.xLim){
      this.x += this.counter;
    }else{
      this.x -= this.counter;
    };

    if(this.yLim){
      this.y += this.counter;
    }else{
      this.y -= this.counter;
    };

    if(getRandomArbitrary(1,1000) > 999){this.yLim = !this.yLim}else{
      if(getRandomArbitrary(1,1000) > 999){this.xLim = !this.xLim}
    }
    if(this.y < this.r && this.y < canvas.height){this.yLim = true;};
    if(this.x < this.r && this.x < canvas.width){this.xLim = true;};

    if(this.y + this.r> canvas.height){this.yLim = false};
    if(this.x + this.r> canvas.width){this.xLim = false};


    ctx.fillStyle  =  this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false)
    ctx.closePath();
    ctx.fill();
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var numParticles = 100
var mass = []
for (var i = 0; i < numParticles; i++) {
  mass[i] = new Partical(
    getRandomArbitrary(0,canvas.width),
    getRandomArbitrary(0,canvas.height),
    10,
    getRandomColor(),
    1);
}

function tic(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < mass.length; i++) {
    mass[i].move()
  }
  requestAnimFrame(tic);
}
tic();
