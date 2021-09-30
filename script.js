var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var carSprite = new Image();
carSprite.src = "./red_coupe.png";

var skySprite = new Image();
skySprite.src = "./sky_race_1200.png";

var rocksSprite = new Image();
rocksSprite.src = "./rocks.png";

var groundSprite_1 = new Image();
groundSprite_1.src = "./ground_1_600.png";

var groundSprite_2 = new Image();
groundSprite_2.src = "./ground_2_600.png";

var groundSprite_3 = new Image();
groundSprite_3.src = "./ground_3_600.png";

var cloudSprite_1 = new Image();
cloudSprite_1.src = "./clouds_1_sm.png";

var cloudSprite_2 = new Image();
cloudSprite_2.src = "./clouds_2.png";

var treesSprite = new Image();
treesSprite.src = "./single_tree.png";


canvas.width = 1200;
canvas.height = 400;

camera = {
  FOV: 100,
  height: 200,
}

var roadLength = 1600;
var roadWidth = 800;
var speed = 50;
var roadMark = 45;
var middleLine = 20;
var tree = 300;
var newZ = 100;
var playerX = 0;
var offSet = 0;
points = [];

class Segment {
  constructor(z, c, s) {
    this.y = 0;
    this.length = 0;
    this.roadMark = 0;
    this.middleLine = 0;
    this.scale = 0;
    this.z = z;
    this.curve = c;
    this.slope = s;
    this.tree = 0;
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
    // var C = - 2 + (Math.floor(Math.random() * 4));
    var C = 0;
    // var S = - 5 + (Math.floor(Math.random() * 10));
    var S = 0;
    var newC = 0;
    var newS = 0;
    for (let j = 0; j < sections[i]; j++) {
      j < sections[i] / 2 ? newC += C : newC -= C;
      j < sections[i] / 2 ? newS += S : newS -= S;
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
    points[i].tree = tree * points[i].scale;
  }
}

function drawRoad() {
  for (let i = 1; i < points.length; i++) {
    if (points[i].z < 2500) {
      i % 5 === 0 ? ctx.fillStyle = "#969696" : ctx.fillStyle = "#969696";
      ctx.beginPath();
      ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
      ctx.closePath();
      ctx.fill();
    }
    if (points[i].z < 2500) {
      if (points[i].y - points[i].slope <= points[i - 1].y - points[i - 1].slope) {
        i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo((canvas.width - points[i].length) / 2 - points[i].roadMark - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i].length) / 2 - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 - points[i - 1].roadMark - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
        ctx.closePath();
        ctx.fill();
      }
    }
    if (points[i].z < 2500) {
      if (points[i].y - points[i].slope <= points[i - 1].y - points[i - 1].slope) {
        i % 2 === 0 ? ctx.fillStyle = "white" : ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo((canvas.width - points[i].length) / 2 + points[i].length - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i].length) / 2 + points[i].length + points[i].roadMark - points[i].curve + playerX * points[i].scale, points[i].y - points[i].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length + points[i - 1].roadMark - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
        ctx.lineTo((canvas.width - points[i - 1].length) / 2 + points[i - 1].length - points[i - 1].curve + playerX * points[i - 1].scale, points[i - 1].y - points[i - 1].slope);
        ctx.closePath();
        ctx.fill();
      }
    }
    if (points[i].z < 2500) {
      if (i % 2 === 0 && points[i].y - points[i].slope <= points[i - 1].y - points[i - 1].slope) {
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
      i % 2 === 0 ? ctx.fillStyle = "#193042" : ctx.fillStyle = "#12273B";
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

function plantTree() {
  for (let i = 1; i < points.length; i++) {
    if (i % 5 == 0) {
      if (points[i].z < 3000) {
        ctx.fillStyle = "green";
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

function update() {
  for (let i = 0; i < points.length; i++) {
    if (points[i].z > 0) {
      points[i].z -= speed;
      playerX += offSet;
    }
    else {
      points.slice(i, 1);
    }
  }
}

var dY = calculateDY(camera.FOV);

populatePoints();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  calculateY();
  ctx.drawImage(skySprite, 0, 150, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(cloudSprite_1, 0, 0, canvas.width, canvas.height, 600, 100, 400, 100);
  ctx.drawImage(rocksSprite, 360, 350, canvas.width, canvas.height, 0, 50, canvas.width, canvas.height);
  ctx.drawImage(cloudSprite_1, 0, 0, canvas.width, canvas.height, 400, 120, 200, 50);

  ctx.drawImage(groundSprite_1, 300 - playerX * 0.05, 0, 300 + playerX * 0.05, 338, 0, 0, 300 + playerX * 0.05, 338);
  ctx.drawImage(groundSprite_1, 0, 0, 600, 338, 300 + playerX * 0.05, 0, 600, 338);
  ctx.drawImage(groundSprite_1, 0, 0, 300, 338, 900 + playerX * 0.05, 0, 300, 338);

  ctx.drawImage(groundSprite_2, 300 - playerX * 0.1, 0, 300 + playerX * 0.1, 338, 0, 0, 300 + playerX * 0.1, 338);
  ctx.drawImage(groundSprite_2, 0, 0, 600, 338, 300 + playerX * 0.1, 0, 600, 338);
  ctx.drawImage(groundSprite_2, 0, 0, 300, 338, 900 + playerX * 0.1, 0, 300, 338);

  ctx.drawImage(groundSprite_3, 300 - playerX * 0.15, 0, 300 + playerX * 0.15, 338, 0, 0, 300 + playerX * 0.15, 338);
  ctx.drawImage(groundSprite_3, 0, 0, 600, 338, 300 + playerX * 0.15, 0, 600, 338);
  ctx.drawImage(groundSprite_3, 0, 0, 300, 338, 900 + playerX * 0.15, 0, 300, 338);

  drawGrass();
  drawRoad();
  ctx.drawImage(carSprite, 510, 250, 180, 180);

  plantTree();

  requestAnimationFrame(animate)
}

animate();

document.addEventListener('keydown', (event) => {
  var name = event.key;
  if (name === 'ArrowLeft') {
    offSet = 0.005;
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