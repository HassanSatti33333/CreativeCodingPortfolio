let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0, 50);

  particles.push(new Particle(mouseX, mouseY));

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, -3);
    this.alpha = 255;
    this.size = random(5, 15);
    this.innerColor = color(random(100, 255), random(50, 100), 0, 150);
    this.outerColor = color(random(100, 255), random(0, 50), 0, 50);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  isFinished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(this.innerColor.levels[0], this.innerColor.levels[1], this.innerColor.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size);

    fill(this.outerColor.levels[0], this.outerColor.levels[1], this.outerColor.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size + 10);
  }
}

