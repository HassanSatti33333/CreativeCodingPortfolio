function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(20);
  
  const gridSize = 80;
  const spacing = gridSize * 1.2;
  
  for (let x = gridSize; x < width - gridSize; x += spacing) {
    for (let y = gridSize; y < height - gridSize; y += spacing) {
      if ((x + y) % (spacing * 2) < spacing) {
        drawStar(x, y, gridSize * 0.4);
      } else {
        drawSmiley(x, y, gridSize * 0.8);
      }
    }
  }
}

function drawStar(x, y, size) {
  push();
  translate(x, y);
  rotate(frameCount * 0.5);
  
  fill(
    (x + frameCount) % 255,
    (y + frameCount * 2) % 255,
    (x + y + frameCount * 3) % 255
  );
  
  beginShape();
  for (let i = 0; i < 360; i += 72) {
    const angle1 = i;
    const angle2 = i + 36;
    vertex(cos(angle1) * size, sin(angle1) * size);
    vertex(cos(angle2) * size * 0.4, sin(angle2) * size * 0.4);
  }
  endShape(CLOSE);
  pop();
}

function drawSmiley(x, y, size) {
  push();
  translate(x, y);
  
  fill(
    200 + 55 * sin(frameCount * 0.05),
    200 + 55 * sin(frameCount * 0.07),
    50 + 50 * sin(frameCount * 0.03)
  );
  ellipse(0, 0, size, size);
  
  fill(0);
  ellipse(-size * 0.2, -size * 0.1, size * 0.15, size * 0.2);
  ellipse(size * 0.2, -size * 0.1, size * 0.15, size * 0.2);
  
  noFill();
  stroke(0);
  strokeWeight(size * 0.05);
  const smileHeight = size * 0.15 * sin(frameCount * 0.1);
  arc(0, size * 0.1, size * 0.5, size * 0.3, 
      20 + smileHeight, 160 - smileHeight);
  noStroke();
  pop();
}
