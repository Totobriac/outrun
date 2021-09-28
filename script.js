var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var carSprite = new Image();
carSprite.src = "./red_coupe.png";

canvas.width = 1200;
canvas.height = 400;

camera = {
  FOV: 100,
  height: 200,
}

var roadLength = 1600;
var roadWidth = 800;
var speed = 20;
var roadMark = 45;
var middleLine = 20;
points = [];
var newZ = 100;
var playerX = 0;
var offSet = 0;

class Segment {
  constructor(z, c, s) {
    this.x = 0;
    this.y = 0;
    this.length = 0;
    this.roadMark = 0;
    this.middleLine = 0;
    this.scale = 0;
    this.z = z;
    this.curve = c;
    this.slope = s;
  }
}

function populatePoints() {

  var sum = 0;
  var sections = [];
  while (sum < 2500) {
    var sectionLength = 20 + 20 * (Math.floor(Math.random() * 3));
    sum += sectionLength;
    sections.push(sectionLength);
  }

  for (let i = 0; i < sections.length; i++) {
    var C = - 3 + (Math.floor(Math.random() * 6));
    var S = - 5 + (Math.floor(Math.random() * 10));
    var newC = 0;
    var newS = 0;
    for (let j = 0; j < sections[i]; j++) {
      j < sections[i] / 2 ? newC += C : newC -= C;
      j < sections[i] / 2 ? newS += S : newS -= S;
      console.log(newS)
      points.push(new Segment(newZ, newC, newS))
      newZ += 100
    }
  }
}

function calculateDY(FOV) {
  var dY = (canvas.height / 2) / Math.tan((FOV / 2 * Math.PI) / 180);
  return dY;
}

function calculateY() {
  for (let i = 0; i < points.length; i++) {
    points[i].y = ((camera.height + points[i].slope) * dY) / points[i].z + canvas.height / 2;
    points[i].scale = dY / points[i].z;
    points[i].length = roadWidth * points[i].scale;
    points[i].roadMark = roadMark * points[i].scale;
    points[i].middleLine = middleLine * points[i].scale;
  }
}

function drawRoad() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 2500) {
      i % 2 === 0 ? ctx.fillStyle = "#A9A9A9" : ctx.fillStyle = "#E8E8E8";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope );
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2500) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].roadMark - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].roadMark - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2500) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length + points[i].roadMark - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length + points[i - 1].roadMark - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2500) {
      if (i % 2 === 0) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length / 2 - points[i].middleLine / 2 - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length / 2 + points[i].middleLine / 2 - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length / 2 + points[i - 1].middleLine / 2 - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length / 2 - points[i - 1].middleLine / 2 - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function drawGrass() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 2500) {
      i % 2 === 0 ? ctx.fillStyle = "#179516" : ctx.fillStyle = "#0B740B";
      ctx.beginPath();
      ctx.moveTo(0, points[i].y - points[i].slope);
      ctx.lineTo(canvas.width, points[i].y - points[i].slope);
      ctx.lineTo(canvas.width, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo(0, points[i - 1].y - points[i - 1].slope);
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
  update();
  calculateY();
  ctx.fillStyle = "#3752A0";
  ctx.fillRect(0, 0, canvas.width, 400);
  drawGrass();
  drawRoad();
  ctx.drawImage(carSprite, 510, 250, 180, 180);
  requestAnimationFrame(animate)
}

animate();

document.addEventListener('keydown', (event) => {
  var name = event.key;
  if (name === 'ArrowLeft') {
    offSet = 0.005;
    console.log(playerX)
  }
  if (name === 'ArrowRight') {
    offSet = -0.005;
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