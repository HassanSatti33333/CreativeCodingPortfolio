let years = [];
let genres = [];
let maxPlayers = 0;
let currentYear = 2015;
let animateYear = false;
let animationSpeed = 0.5;
let hoveredGenre = null;

const genreData = {
  "2015": {
    "MOBA": { players: 115000000, revenue: 1.5 },
    "MMO": { players: 12000000, revenue: 0.8 },
    "FPS": { players: 80000000, revenue: 1.2 },
    "Open-World RPG": { players: 50000000, revenue: 1.0 },
    "Mobile": { players: 90000000, revenue: 3.0 },
    "Roguelike/Lite": { players: 5000000, revenue: 0.1 },
    "Survival/Crafting": { players: 30000000, revenue: 0.5 }
  },
  "2016": {
    "MOBA": { players: 120000000, revenue: 1.6 },
    "MMO": { players: 11000000, revenue: 0.75 },
    "FPS": { players: 85000000, revenue: 1.3 },
    "Open-World RPG": { players: 55000000, revenue: 1.1 },
    "Mobile": { players: 110000000, revenue: 3.5 },
    "Roguelike/Lite": { players: 6000000, revenue: 0.15 },
    "Survival/Crafting": { players: 35000000, revenue: 0.6 }
  },
  "2017": {
    "MOBA": { players: 125000000, revenue: 1.7 },
    "MMO": { players: 10000000, revenue: 0.7 },
    "FPS": { players: 90000000, revenue: 1.4 },
    "Open-World RPG": { players: 60000000, revenue: 1.2 },
    "Mobile": { players: 130000000, revenue: 4.0 },
    "Roguelike/Lite": { players: 7000000, revenue: 0.2 },
    "Survival/Crafting": { players: 40000000, revenue: 0.7 },
    "Battle Royale": { players: 50000000, revenue: 0.5 }
  },
  "2018": {
    "MOBA": { players: 130000000, revenue: 1.8 },
    "MMO": { players: 9000000, revenue: 0.65 },
    "FPS": { players: 95000000, revenue: 1.5 },
    "Open-World RPG": { players: 65000000, revenue: 1.3 },
    "Mobile": { players: 150000000, revenue: 4.5 },
    "Roguelike/Lite": { players: 8000000, revenue: 0.25 },
    "Survival/Crafting": { players: 45000000, revenue: 0.8 },
    "Battle Royale": { players: 125000000, revenue: 1.8 }
  },
  "2019": {
    "MOBA": { players: 135000000, revenue: 1.9 },
    "MMO": { players: 8000000, revenue: 0.6 },
    "FPS": { players: 100000000, revenue: 1.6 },
    "Open-World RPG": { players: 70000000, revenue: 1.4 },
    "Mobile": { players: 170000000, revenue: 5.0 },
    "Roguelike/Lite": { players: 10000000, revenue: 0.3 },
    "Survival/Crafting": { players: 50000000, revenue: 0.9 },
    "Battle Royale": { players: 200000000, revenue: 2.5 }
  },
  "2020": {
    "MOBA": { players: 140000000, revenue: 2.0 },
    "MMO": { players: 7500000, revenue: 0.55 },
    "FPS": { players: 110000000, revenue: 1.8 },
    "Open-World RPG": { players: 75000000, revenue: 1.6 },
    "Mobile": { players: 200000000, revenue: 6.0 },
    "Roguelike/Lite": { players: 15000000, revenue: 0.5 },
    "Survival/Crafting": { players: 60000000, revenue: 1.2 },
    "Battle Royale": { players: 250000000, revenue: 3.0 }
  },
  "2021": {
    "MOBA": { players: 150000000, revenue: 2.2 },
    "MMO": { players: 7000000, revenue: 0.5 },
    "FPS": { players: 120000000, revenue: 2.0 },
    "Open-World RPG": { players: 80000000, revenue: 1.8 },
    "Mobile": { players: 230000000, revenue: 7.0 },
    "Roguelike/Lite": { players: 20000000, revenue: 0.8 },
    "Survival/Crafting": { players: 70000000, revenue: 1.5 },
    "Battle Royale": { players: 300000000, revenue: 3.5 }
  },
  "2022": {
    "MOBA": { players: 160000000, revenue: 2.4 },
    "MMO": { players: 6500000, revenue: 0.45 },
    "FPS": { players: 130000000, revenue: 2.2 },
    "Open-World RPG": { players: 85000000, revenue: 2.0 },
    "Mobile": { players: 260000000, revenue: 8.0 },
    "Roguelike/Lite": { players: 25000000, revenue: 1.2 },
    "Survival/Crafting": { players: 75000000, revenue: 1.8 },
    "Battle Royale": { players: 320000000, revenue: 4.0 }
  },
  "2023": {
    "MOBA": { players: 170000000, revenue: 2.6 },
    "MMO": { players: 6000000, revenue: 0.4 },
    "FPS": { players: 140000000, revenue: 2.4 },
    "Open-World RPG": { players: 90000000, revenue: 2.2 },
    "Mobile": { players: 300000000, revenue: 9.0 },
    "Roguelike/Lite": { players: 30000000, revenue: 1.5 },
    "Survival/Crafting": { players: 80000000, revenue: 2.0 },
    "Battle Royale": { players: 340000000, revenue: 4.5 }
  },
  "2024": {
    "MOBA": { players: 175000000, revenue: 2.7 },
    "MMO": { players: 5500000, revenue: 0.35 },
    "FPS": { players: 150000000, revenue: 2.6 },
    "Open-World RPG": { players: 95000000, revenue: 2.4 },
    "Mobile": { players: 350000000, revenue: 10.0 },
    "Roguelike/Lite": { players: 35000000, revenue: 1.8 },
    "Survival/Crafting": { players: 85000000, revenue: 2.2 },
    "Battle Royale": { players: 350000000, revenue: 5.0 }
  },
  "2025": {
    "MOBA": { players: 180000000, revenue: 2.8 },
    "MMO": { players: 5000000, revenue: 0.3 },
    "FPS": { players: 160000000, revenue: 2.8 },
    "Open-World RPG": { players: 100000000, revenue: 2.6 },
    "Mobile": { players: 400000000, revenue: 12.0 },
    "Roguelike/Lite": { players: 40000000, revenue: 2.0 },
    "Survival/Crafting": { players: 90000000, revenue: 2.5 },
    "Battle Royale": { players: 360000000, revenue: 5.5 }
  }
};

function setup() {
  createCanvas(1000, 600);
  textFont('Arial');
  textSize(14);
  
  processData();
  
  yearSlider = createSlider(2015, 2025, 2015, 1);
  yearSlider.position(20, height - 30);
  yearSlider.style('width', '300px');
  yearSlider.input(() => {
    currentYear = yearSlider.value();
    animateYear = false;
  });
  
  playButton = createButton('Play Animation');
  playButton.position(350, height - 35);
  playButton.mousePressed(() => {
    animateYear = !animateYear;
    playButton.html(animateYear ? 'Pause' : ' Play Animation');
  });
}

function processData() {
  years = Object.keys(genreData).map(Number).sort((a, b) => a - b);
  
  let allGenres = new Set();
  for (let year in genreData) {
    for (let genre in genreData[year]) {
      allGenres.add(genre);
    }
  }
  genres = Array.from(allGenres);
  
  for (let year in genreData) {
    for (let genre in genreData[year]) {
      if (genreData[year][genre].players > maxPlayers) {
        maxPlayers = genreData[year][genre].players;
      }
    }
  }
}

function draw() {
  background(240);
  
  if (animateYear) {
    currentYear += animationSpeed * (deltaTime / 1000);
    if (currentYear >= 2025) {
      currentYear = 2015;
    }
    yearSlider.value(currentYear);
  }
  
  fill(0);
  textSize(24);
  text(`Video Game Genre Popularity: ${Math.floor(currentYear)}`, 20, 40);
  textSize(14);
  text("Players (in millions)", 20, 70);
  
  drawAxes();
  drawGenreBars();
  drawLegend();
  
  if (hoveredGenre) {
    drawHoverInfo();
  }
  
  fill(100);
  textSize(12);
  text("Drag slider or click play to animate through years", 20, height - 10);
}

function drawAxes() {
  stroke(150);
  line(150, 100, 150, height - 100);
  line(150, height - 100, width - 50, height - 100);
  
  for (let i = 0; i <= 5; i++) {
    let y = map(i, 0, 5, height - 100, 100);
    let players = (i * maxPlayers / 5 / 1000000).toFixed(1);
    fill(100);
    noStroke();
    text(players, 120, y + 5);
    stroke(150);
    line(145, y, 150, y);
  }
}

function drawGenreBars() {
  hoveredGenre = null;
  
  let yearData = getInterpolatedData(currentYear);
  
  let sortedGenres = genres.slice().sort((a, b) => yearData[b].players - yearData[a].players);
  
  let barWidth = (width - 200) / genres.length;
  for (let i = 0; i < sortedGenres.length; i++) {
    let genre = sortedGenres[i];
    let x = 150 + i * barWidth + 10;
    let h = map(yearData[genre].players, 0, maxPlayers, 0, height - 200);
    let y = height - 100 - h;
    
    let mouseInBar = mouseX > x && mouseX < x + barWidth - 20 && 
                    mouseY > y && mouseY < height - 100;
    
    let genreColor = getGenreColor(genre);
    if (mouseInBar) {
      hoveredGenre = genre;
      fill(genreColor);
      stroke(0);
      strokeWeight(2);
    } else {
      fill(genreColor);
      noStroke();
    }
    
    rect(x, y, barWidth - 20, h, 5);
    
    push();
    textSize(12);
    fill(0);
    textAlign(CENTER);
    text(genre, x + (barWidth - 20)/2, height - 85);
    pop();
  }
}

function getInterpolatedData(targetYear) {
  targetYear = constrain(targetYear, 2015, 2025);
  let year1 = floor(targetYear);
  let year2 = ceil(targetYear);
  let ratio = targetYear - year1;
  
  let result = {};
  
  for (let genre of genres) {
    let players1 = genreData[year1] && genreData[year1][genre] ? genreData[year1][genre].players : 0;
    let players2 = genreData[year2] && genreData[year2][genre] ? genreData[year2][genre].players : 0;
    
    result[genre] = {
      players: lerp(players1, players2, ratio),
      revenue: lerp(
        genreData[year1] && genreData[year1][genre] ? genreData[year1][genre].revenue : 0,
        genreData[year2] && genreData[year2][genre] ? genreData[year2][genre].revenue : 0,
        ratio
      )
    };
  }
  
  return result;
}

function getGenreColor(genre) {
  const colors = {
    "Battle Royale": color(255, 99, 132),
    "MOBA": color(54, 162, 235),
    "Open-World RPG": color(255, 159, 64),
    "FPS": color(75, 192, 192),
    "Survival/Crafting": color(153, 102, 255),
    "Mobile": color(255, 205, 86),
    "Roguelike/Lite": color(201, 203, 207),
    "MMO": color(255, 99, 255)
  };
  return colors[genre] || color(100);
}

function drawLegend() {
  fill(0);
  textSize(16);
  text("Genres:", width - 200, 40);
  
  let y = 70;
  for (let genre of genres) {
    fill(getGenreColor(genre));
    rect(width - 220, y - 10, 15, 15);
    fill(0);
    text(genre, width - 200, y);
    y += 25;
  }
}

function drawHoverInfo() {
  let yearData = getInterpolatedData(currentYear);
  let info = yearData[hoveredGenre];
  
  let x = mouseX + 20;
  let y = mouseY - 20;
  let w = 200;
  let h = 80;
  
  if (x + w > width) x = mouseX - w - 20;
  if (y + h > height) y = mouseY - h - 20;
  
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h, 5);
  
  drawingContext.shadowColor = color(0, 0, 0, 50);
  drawingContext.shadowBlur = 10;
  drawingContext.shadowOffsetY = 5;
  
  fill(0);
  textSize(16);
  text(hoveredGenre, x + 10, y + 25);
  
  textSize(14);
  text(`Players: ${(info.players/1000000).toFixed(1)}M`, x + 10, y + 45);
  text(`Revenue: $${info.revenue.toFixed(1)}B`, x + 10, y + 65);
  
  drawingContext.shadowColor = 'transparent';
}
