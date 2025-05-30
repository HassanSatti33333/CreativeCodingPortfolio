let trees = [];
const grassHeight = 120;

function setup() {
  createCanvas(windowWidth, windowHeight);

  const donateBtn = createButton('Donate $1');
  donateBtn.position(20, 20);
  donateBtn.style('font-size', '18px');
  donateBtn.style('padding', '10px 20px');
  donateBtn.style('background-color', '#228B22');
  donateBtn.style('color', 'white');
  donateBtn.style('border', 'none');
  donateBtn.style('border-radius', '8px');
  donateBtn.style('cursor', 'pointer');

  donateBtn.mousePressed(() => {
    addTree();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  drawScene();
  drawTitle();
  drawTrees();
}

function drawScene() {
 
  background(135, 206, 235);


  noStroke();
  fill(34, 139, 34);
  rect(0, height - grassHeight, width, grassHeight);
}

function drawTitle() {
  fill(0, 102, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  textStyle(BOLD);
  text('Raise Awareness: Grow More Trees to Combat Deforestation', width / 2, 180);
}

function addTree() {
  let x = random(50, width - 50);
  let y = height - grassHeight;

  trees.push({ x, y });
}

function drawTrees() {
  for (let tree of trees) {
    drawTree(tree.x, tree.y);
  }
}

function drawTree(x, y) {
  // Trunk
  stroke(101, 67, 33);
  strokeWeight(10);
  line(x, y, x, y - 60);

  
  noStroke();
  fill(34, 139, 34);
  ellipse(x, y - 80, 70, 70);
  ellipse(x - 25, y - 90, 50, 50);
  ellipse(x + 25, y - 90, 50, 50);
  ellipse(x, y - 120, 60, 60);
}

