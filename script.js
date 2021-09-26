var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 400;
camera = {
  FOV: 100,
  height: 200,
}
var roadLength = 2000;
var roadWidth = 800;
var speed = 10;
var roadMark = 45;
var middleLine = 20;
points = [];
var newZ = 100;

function populatePoints() {
  for (let i = 0; i < roadLength; i++) {
    points.push({ x: 0, y: 0, z: newZ, length: 0, roadMark: 0, middleLine: 0 });
    newZ += 100;
  }
}

function calculateDY(FOV) {
  var dY = (canvas.height / 2) / Math.tan((FOV / 2 * Math.PI) / 180);
  return dY;
}

function calculateY() {
  for (let i = 0; i < points.length; i++) {
    points[i].y = (camera.height * dY) / points[i].z + canvas.height / 2;
    scale = dY / points[i].z;
    points[i].length = roadWidth * scale;
    points[i].roadMark = roadMark * scale;
    points[i].middleLine = middleLine * scale;
  }
}

function drawRoad() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 2000) {
      i % 2 === 0 ? ctx.fillStyle = "#A9A9A9" : ctx.fillStyle = "#E8E8E8";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2, points[i].y);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length, points[i].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length, points[i - 1].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2, points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2000) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].roadMark, points[i].y);
      ctx.lineTo((canvas.width - points[i].length) / 2, points[i].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2, points[i - 1].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i].roadMark, points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2000) {
      i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length, points[i].y);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length + points[i].roadMark, points[i].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length + points[i - 1].roadMark, points[i - 1].y);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length, points[i - 1].y);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2000) {
      if (i % 2 === 0) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length / 2 - points[i].middleLine / 2, points[i].y);
        ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length / 2 + points[i].middleLine / 2, points[i].y);
        ctx.lineTo((canvas.width - points[i-1].length) / 2 + points[i-1].length / 2 + points[i-1].middleLine / 2, points[i-1].y);
        ctx.lineTo((canvas.width - points[i-1].length) / 2 + points[i-1].length / 2 - points[i-1].middleLine / 2, points[i-1].y);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function drawGrass() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 2000) {
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
    }
  }
}

var dY = calculateDY(camera.FOV);
populatePoints();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  calculateY();
  drawGrass();
  drawRoad();
  requestAnimationFrame(animate)
}

animate();
