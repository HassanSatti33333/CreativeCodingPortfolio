function setup() {
  createCanvas(600, 300);
  noStroke();
}

function draw() {
  background(255, 240, 245);
  
  fill(255, 209, 178);
  beginShape();
  vertex(150, 220);
  bezierVertex(130, 180, 170, 150, 220, 150);
  vertex(380, 150);
  bezierVertex(430, 150, 470, 180, 450, 220);
  vertex(150, 220);
  endShape();
  
  fill(200, 230, 255, 200);
  quad(220, 150, 280, 150, 250, 180, 220, 180);
  rect(280, 150, 100, 30);
  triangle(380, 150, 450, 180, 380, 180);
  
  fill(70);
  ellipse(200, 220, 60, 60);
  ellipse(400, 220, 60, 60);
  fill(120);
  ellipse(200, 220, 30, 30);
  ellipse(400, 220, 30, 30);
  
  fill(255);
  ellipse(180, 180, 50, 40);
  fill(0);
  ellipse(170, 175, 8, 8);
  ellipse(190, 175, 8, 8);
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(180, 185, 20, 10, 0, PI);
  noStroke();
  
  fill(255, 100, 150);
  beginShape();
  vertex(300, 190);
  bezierVertex(280, 170, 260, 180, 300, 210);
  bezierVertex(340, 180, 320, 170, 300, 190);
  endShape();
  
  fill(255, 150, 150);
  rect(140, 210, 20, 10, 5);
  rect(440, 210, 20, 10, 5);
  
  fill(150, 255, 150);
  rect(330, 140, 3, 15);
  fill(255, 150, 255);
  ellipse(332, 130, 15, 15);
  fill(255, 255, 150);
  ellipse(332, 130, 7, 7);
}