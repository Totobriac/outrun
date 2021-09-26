var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;

canvas.width = 1200;
canvas.height = 400;

camera = {
  y: 200,
  distance: 8,
}

var roadLength = 400;
var segments = [];

points = [];
var newZ = 0;

function populatePoints() {
  for (let i = 0; i < roadLength; i++) {
    points.push({ x: 400, y: 0, z: newZ, yS: 0, xSl: 0, xSr: 0 });
    newZ += 8;
  }
}

function calculateY() {
  for (let i = 0; i < points.length; i++) {
    if (points[i].z > 0) {
      var yS = ((camera.y * camera.distance) / points[i].z) + canvas.height / 2;
      points[i].yS = yS;
    };
  }
}

function draw() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 30) {
      i % 2 === 0 ? ctx.strokeStyle = "blue" : ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(300, points[i].yS);
      ctx.lineTo(900, points[i].yS);
      ctx.stroke();
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < points.length; i++) {
    points[i].z -= 3;
  }
  calculateY();
  draw();
  requestAnimationFrame(animate);
}

populatePoints();
animate();


// project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height) {
//   p.camera.x     = (p.world.x || 0) - cameraX;
//   p.camera.y     = (p.world.y || 0) - cameraY;
//   p.camera.z     = (p.world.z || 0) - cameraZ;
//   p.screen.scale = cameraDepth/p.camera.z;
//   p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
//   p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
// },
