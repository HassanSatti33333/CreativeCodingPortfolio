// Store our design elements
let font;          // Holds the custom font we'll load
let colors = [];   // Empty array that will store our color palette

// Load assets before the program starts
function preload() {
  font = loadFont('RubikDistressed-Regular.ttf'); // Load the font
}

// Initial setup when program launches
function setup() {
  createCanvas(800, 400); // Create an 800x400 pixel drawing canvas
  generateColors(100);    // Create 100 random bright colors for our palette
}

// Main animation loop that runs continuously
function draw() {
  background(220); // Set light gray background
  
  // Draw main heading at center
  drawText("BATH SPA", width/2, height/2, 120);
  
  // When mouse is pressed, draw subtitle at mouse position
  if (mouseIsPressed) {
    drawText("UNIVERSITY", mouseX, mouseY, 80);
  }
}

// Custom function to draw styled text
function drawText(txt, x, y, size) {
  push(); // Save current drawing settings
  
  translate(x, y); // Move to specified position
  
  // Use our custom font if it loaded successfully
  if (font) {
    textFont(font);
  }
  
  textSize(size);       // Set text size
  textAlign(CENTER, CENTER); // Center alignment
  
  // Create shadow effect by drawing text multiple times with offset
  fill(0); // Black color for shadow
  for (let i = 0; i < 5; i++) {
    text(txt, i, i);
  }
  
  // Draw main text with random color from palette
  fill(random(colors));
  text(txt, 0, 0);
  
  // Add decorative floating dots around text
  noStroke(); // No outline on circles
  for (let i = 0; i < 10; i++) {
    fill(random(colors)); // Random color from palette
    circle(
      random(-textWidth(txt)/2, textWidth(txt)/2), // Random x-position near text
      random(-size/2, size/2),                     // Random y-position near text
      random(3, 8)                                 // Random circle size 3-8px
    );
  }
  
  pop(); // Restore original drawing settings
}

// Handle mouse click events
function mouseClicked() {
  generateColors(10); // Generate 10 new random colors when clicked
}

// Create random bright colors
function generateColors(count) {
  colors = []; // Clear existing colors
  
  // Generate specified number of colors
  for (let i = 0; i < count; i++) {
    colors.push(color(
      random(100, 255), // Bright red (100-255)
      random(100, 255), // Bright green
      random(100, 255)  // Bright blue
    ));
  }
}