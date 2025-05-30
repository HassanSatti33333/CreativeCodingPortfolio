let song;
let fft;
let kickDetector;
let snareDetector;
let voiceDetector;

let shapeArr = [];
let bloodDrops = [];
let lightningBranches = [];
let voiceCircles = [];

function preload() {
  song = loadSound('BLOODY STREAM.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
  
  fft = new p5.FFT(0.9, 128);
  fft.setInput(song);

  kickDetector = new BeatDetect('kick');
  snareDetector = new BeatDetect('snare');
  voiceDetector = new BeatDetect('male');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Dark red background with subtle pulsing
  let bgBrightness = 10 + 5 * sin(frameCount * 0.05);
  background(0, 80, bgBrightness);
  
  // Analyze audio
  const kick = kickDetector.update(fft);
  const snare = snareDetector.update(fft);
  const voice = voiceDetector.update(fft);
  
  // Center of screen
  translate(width/2, height/2);
  
  // Create visual elements based on beats
  if (kick.isBeat) {
    createBloodSplash(kick.level * 2);
    shapeArr.push(new HeartShape(random(-width/3, width/3), random(-height/3, height/3)));
  }
  
  if (snare.isBeat) {
    createLightning(snare.level * 3);
  }
  
  if (voice.isBeat) {
    createVoiceCircle(voice.level * 4);
  }
  
  // Update and display all visual elements
  updateBloodDrops();
  updateLightning();
  updateVoiceCircles();
  updateShapes();
  
  // Draw spectrum analyzer with bloody effect
  drawBloodySpectrum();
  
  // Dark vignette effect
  drawVignette();
}

function mouseClicked() {
  togglePlay();
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

// Blood effects for kick/bass
function createBloodSplash(intensity) {
  const dropCount = 20 + intensity * 5;
  for (let i = 0; i < dropCount; i++) {
    const speed = random(1, 5) * intensity/10;
    const size = random(3, 10) * intensity/20;
    const angle = random(TWO_PI);
    bloodDrops.push({
      x: random(-width/4, width/4),
      y: random(-height/4, height/4),
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: size,
      life: 100 + random(50)
    });
  }
}

function updateBloodDrops() {
  for (let i = bloodDrops.length - 1; i >= 0; i--) {
    const drop = bloodDrops[i];
    
    // Update position
    drop.x += drop.vx;
    drop.y += drop.vy;
    drop.vy += 0.1; // Gravity
    
    // Fade out
    drop.life -= 1;
    
    // Draw drop
    const alpha = map(drop.life, 100, 0, 100, 0);
    fill(0, 90, 70, alpha);
    ellipse(drop.x, drop.y, drop.size);
    
    // Trail effect
    for (let j = 0; j < 3; j++) {
      fill(0, 90, 70, alpha * 0.5);
      ellipse(
        drop.x - drop.vx * j * 0.3,
        drop.y - drop.vy * j * 0.3,
        drop.size * (1 - j * 0.2)
      );
    }
    
    // Remove dead drops
    if (drop.life <= 0 || drop.y > height/2 + 100) {
      bloodDrops.splice(i, 1);
    }
  }
}

// Lightning effects for snare/instruments
function createLightning(intensity) {
  const branchCount = 3 + floor(intensity/5);
  for (let i = 0; i < branchCount; i++) {
    const startX = random(-width/2, width/2);
    const startY = random(-height/2, 0);
    const length = 100 + intensity * 5;
    const segments = 10 + intensity/2;
    
    lightningBranches.push({
      points: generateLightning(startX, startY, length, segments),
      life: 30 + intensity,
      brightness: 80 + random(20)
    });
  }
}

function generateLightning(x, y, length, segments) {
  const points = [{x, y}];
  let currentY = y;
  
  for (let i = 1; i < segments; i++) {
    currentY += length/segments;
    points.push({
      x: x + random(-30, 30),
      y: currentY
    });
  }
  
  // Add some sub-branches
  if (segments > 5) {
    const branchPoint = floor(random(3, segments-2));
    const branchLength = length * random(0.3, 0.6);
    const branchSegments = floor(segments * 0.7);
    const branchAngle = random(-PI/4, PI/4);
    
    let lastPoint = points[branchPoint];
    for (let i = 1; i < branchSegments; i++) {
      lastPoint = {
        x: lastPoint.x + cos(branchAngle) * branchLength/branchSegments,
        y: lastPoint.y + sin(branchAngle) * branchLength/branchSegments + random(-10, 10)
      };
      points.push(lastPoint);
    }
  }
  
  return points;
}

function updateLightning() {
  for (let i = lightningBranches.length - 1; i >= 0; i--) {
    const bolt = lightningBranches[i];
    
    // Draw lightning
    stroke(200, 50, bolt.brightness, bolt.life * 2);
    strokeWeight(1 + bolt.life/30);
    noFill();
    
    beginShape();
    for (const point of bolt.points) {
      vertex(point.x, point.y);
    }
    endShape();
    
    // Fade out
    bolt.life -= 2;
    
    // Remove dead lightning
    if (bolt.life <= 0) {
      lightningBranches.splice(i, 1);
    }
  }
}

// Voice circle effects
function createVoiceCircle(intensity) {
  voiceCircles.push({
    x: random(-width/4, width/4),
    y: random(-height/4, height/4),
    size: 10,
    maxSize: 50 + intensity * 3,
    growthRate: 2 + intensity/10,
    life: 100,
    hue: random(360)
  });
}

function updateVoiceCircles() {
  for (let i = voiceCircles.length - 1; i >= 0; i--) {
    const circle = voiceCircles[i];
    
    // Grow and fade
    if (circle.size < circle.maxSize) {
      circle.size += circle.growthRate;
    }
    circle.life -= 1;
    
    // Draw circle with pulsing effect
    const alpha = map(circle.life, 100, 0, 60, 0);
    const pulse = sin(frameCount * 0.2) * 5;
    
    noFill();
    stroke(circle.hue, 80, 90, alpha);
    strokeWeight(2);
    ellipse(circle.x, circle.y, circle.size + pulse);
    
    // Inner glow
    fill(circle.hue, 50, 100, alpha * 0.3);
    noStroke();
    ellipse(circle.x, circle.y, circle.size * 0.7);
    
    // Remove dead circles
    if (circle.life <= 0) {
      voiceCircles.splice(i, 1);
    }
  }
}

// Heart shapes for strong beats
class HeartShape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.maxSize = 50 + random(50);
    this.growthRate = 2;
    this.rotation = random(TWO_PI);
    this.life = 100;
    this.hue = 0; // Red hue
  }
  
  update() {
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
    }
    this.life -= 1.5;
    this.rotation += 0.01;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    const alpha = map(this.life, 100, 0, 100, 0);
    fill(this.hue, 90, 90, alpha * 0.7);
    noStroke();
    
    beginShape();
    for (let t = 0; t < TWO_PI; t += 0.1) {
      const x = 16 * pow(sin(t), 3);
      const y = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t));
      vertex(x * this.size * 0.1, y * this.size * 0.1);
    }
    endShape(CLOSE);
    
    // Glow effect
    fill(this.hue, 80, 100, alpha * 0.3);
    ellipse(0, 0, this.size * 1.5);
    
    pop();
  }
  
  isDead() {
    return this.life <= 0;
  }
}

function updateShapes() {
  for (let i = shapeArr.length - 1; i >= 0; i--) {
    shapeArr[i].update();
    shapeArr[i].display();
    if (shapeArr[i].isDead()) {
      shapeArr.splice(i, 1);
    }
  }
}

// Spectrum analyzer with bloody effect
function drawBloodySpectrum() {
  let spectrum = fft.analyze();
  let waveform = fft.waveform();
  
  // Bloody spectrum bars
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    const x = map(i, 0, spectrum.length, -width/2, width/2);
    const h = map(spectrum[i], 0, 255, 0, height/2);
    
    // Blood color with variation
    const hueVariation = sin(frameCount * 0.05 + i * 0.1) * 10;
    fill(0 + hueVariation, 90, 70, 80);
    
    rect(x, height/4, width/spectrum.length * 1.5, -h * 0.7);
  }
  
  // Waveform as dripping blood
  beginShape();
  fill(0, 90, 60, 100);
  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length, -width/2, width/2);
    const y = map(waveform[i], -1, 1, -50, 50) + height/3;
    vertex(x, y);
    
    // Random drips
    if (random() < 0.01) {
      const dripLength = random(10, 50);
      beginShape();
      vertex(x, y);
      vertex(x + random(-5, 5), y + dripLength);
      vertex(x + random(-5, 5), y + dripLength + 10);
      endShape();
    }
  }
  endShape();
}

// Vignette effect for dark edges
function drawVignette() {
  resetMatrix();
  noStroke();
  for (let r = 0; r < 3; r++) {
    const radius = width * (0.8 - r * 0.2);
    const alpha = 30 - r * 10;
    fill(0, 0, 0, alpha);
    ellipse(width/2, height/2, radius, radius);
  }
}

// Beat Detection Class (same as original)
class BeatDetect {
  constructor(mode = 'kick', freq2) {
    if (!isNaN(freq2) && !isNaN(mode)) {
      this.freq1 = mode;
      this.freq2 = freq2;
    } else {
      if (mode == 'snare') {
        this.freq1 = 2000;
        this.freq2 = 6000;
      } else if (mode == 'male') {
        this.freq1 = 200;
        this.freq2 = 2000;
      } else {
        this.freq1 = 20;
        this.freq2 = 80;
      }
    }
    this.time = 0;
    this.threshold = 0;
    this.minThreshold = 0;
    this.decayRate = 0.01;
    this.minThresholdRate = 0.8;
    this.holdTime = 45;
    this.marginThresholdTime = 10;
    this.marginThreshold = 0.06;
  }
  update(fft) {
    const e = fft.getEnergy(this.freq1, this.freq2);
    const level = e / 255.0 || 0.0;
    let isBeat = false;
    if (level > this.threshold && level > this.minThreshold) {
      this.threshold = level * 1.05;
      this.minThreshold = max(this.minThreshold, level * this.minThresholdRate);
      if (this.time > this.marginThresholdTime) isBeat = true;
      this.time = 0;
    } else {
      if (this.time == this.marginThresholdTime) this.threshold -= this.marginThreshold;
      this.time += 1;
      if (this.time > this.holdTime) this.threshold -= this.decayRate;
    }
    return { threshold: this.threshold, level: level, isBeat: isBeat };
  }
}