function setup() {
  createCanvas(400, 200);
  noStroke();
}

function draw() {
  background(10, 20, 30);

let ufoX = 200 + sin(frameCount * 0.05) * 50;
fill(80, 80, 80); 
ellipse(ufoX, 150, 180, 60);
fill(200, 250, 250);
ellipse(ufoX, 140, 120, 30);
fill(100, 200, 255, 150);


  fill(100, 200, 100);
ellipse(ufoX, 100, 80, 100); 
  

  let eyeSize = 20 + 5 * sin(frameCount * 0.1);
  fill(255, 50, 50);
  let leftEyeX = ufoX - 15 + (mouseX - ufoX) * 0.05;
  let rightEyeX = ufoX + 15 + (mouseX - ufoX) * 0.05;
  ellipse(leftEyeX, 90, eyeSize);
  ellipse(rightEyeX, 90, eyeSize);
  fill(255);
  ellipse(leftEyeX, 90, eyeSize/2);
  ellipse(rightEyeX, 90, eyeSize/2);
fill(50, 100, 50);
  arc(ufoX, 120, 30, 20, 0, PI);
  

  for(let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 3);
    fill(255, 255, 200, random(150, 255));
    ellipse(x, y, size);
  }
}