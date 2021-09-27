var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var carSprite = new Image();
carSprite.src = "./red_coupe.png";

canvas.width = 1200;
canvas.height = 400;
camera = {
  FOV: 100,
  height: 200,
  offset: 600,
}
var roadLength = 2000;
var roadWidth = 800;
var speed = 10;
var roadMark = 45;
var middleLine = 20;
points = [];
var newZ = 100;
var newC = 0;
var playerX = 0;
var offSet = 0;

document.addEventListener('keydown', (event) => {
  var name = event.key;
  if (name === 'ArrowLeft') {
    offSet = 0.007;
  }
  if (name === 'ArrowRight') {
    offSet = -0.007;
  }
}, false);

document.addEventListener('keyup', (event) => {
  var name = event.key;
  if (name === 'ArrowLeft') {
    offSet = 0;
  }
  if (name === 'ArrowRight') {
    offSet = 0;
  }
}, false);


function populatePoints() {
  for (let i = 0; i < roadLength; i++) {
    points.push({ x: 0, y: 0, z: newZ, length: 0, roadMark: 0, middleLine: 0, curve: newC, scale: 0 });
    newZ += 100;
    newC -= 0;
  }
}

function calculateDY(FOV) {
  var dY = (canvas.height / 2) / Math.tan((FOV / 2 * Math.PI) / 180);
  return dY;
}

function calculateY() {
  for (let i = 0; i < points.length; i++) {
    points[i].y = (camera.height * dY) / points[i].z + canvas.height / 2;
    points[i].scale = dY / points[i].z;
    points[i].length = roadWidth * points[i].scale;
    points[i].roadMark = roadMark * points[i].scale;
    points[i].middleLine = middleLine * points[i].scale;
  }
}

function drawRoad() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 1800) {
      i % 2 === 0 ? ctx.fillStyle = "#A9A9A9" : ctx.fillStyle = "#E8E8E8";
      ctx.beginPath();


      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].curve + playerX * points[i].scale, points[i].y);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + playerX * points[i].scale, points[i].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + playerX * points[i-1].scale  , points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 1800) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].roadMark - points[i].curve + playerX * points[i].scale, points[i].y);
      ctx.lineTo((canvas.width - points[i].length) / 2 - points[i].curve +  playerX * points[i].scale, points[i].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].roadMark - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 1800) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + playerX * points[i].scale, points[i].y);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length + points[i].roadMark - points[i].curve + playerX * points[i].scale, points[i].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length + points[i - 1].roadMark - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 1800) {
      if (i % 2 === 0) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length / 2 - points[i].middleLine / 2 - points[i].curve + playerX * points[i].scale, points[i].y);
        ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length / 2 + points[i].middleLine / 2 - points[i].curve + playerX * points[i].scale, points[i].y);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length / 2 + points[i - 1].middleLine / 2 - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length / 2 - points[i - 1].middleLine / 2 - points[i - 1].curve + playerX * points[i-1].scale, points[i - 1].y);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function drawGrass() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 1800) {
      i % 2 === 0 ? ctx.fillStyle = "#179516" : ctx.fillStyle = "#0B740B";
      ctx.beginPath();
      ctx.moveTo(0, points[i].y);
      ctx.lineTo(canvas.width, points[i].y);
      ctx.lineTo(canvas.width, points[i - 1].y);
      ctx.lineTo(0, points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function update() {
  for (let i = 0; i < points.length; i++) {
    if (points[i].z > 0) {
      points[i].z -= speed;
      playerX += offSet;
    }
  }
}

var dY = calculateDY(camera.FOV);

populatePoints();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#3752A0";
  ctx.fillRect(0, 0, canvas.width, 300);
  update();
  calculateY();

  ctx.beginPath();
  ctx.lineTo(600, 0);
  ctx.closePath();
  ctx.stroke();


  drawGrass();
  drawRoad();
  ctx.drawImage(carSprite, 510, 250, 180, 180);
  requestAnimationFrame(animate)
}

animate();
