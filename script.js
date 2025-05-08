import Ant from "./Ant.js";

let tiles = []; // 2D array [row][col]
let rows, cols;
let ant;
let interval;

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = ""; // Clear old tiles

  const tileSize = 5; // desired square size in pixels
  const width = window.innerWidth;
  const height = window.innerHeight;

  cols = Math.floor(width / tileSize);
  rows = Math.floor(height / tileSize);
  tiles = [];

  // Set grid template
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  for (let i = 0; i < rows; i++) {
    tiles[i] = [];
    for (let j = 0; j < cols; j++) {
      const tile = document.createElement("div");
      tile.className = "tile white";
      grid.appendChild(tile);
      tiles[i][j] = tile;
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault(); // Prevents scrolling
    createGrid(); // Recreate grid on spacebar press
    placeAnt(); // create ant here
  }
});

function placeAnt() {
  const startCol = Math.floor(cols / 2);
  const startRow = Math.floor(rows / 2);
  ant = new Ant(tiles, startRow, startCol);

  requestAnimationFrame(animate);
}

function animate() {
  ant.step();
  requestAnimationFrame(animate);
}

window.addEventListener("load", createGrid);
// Optional: Also update on resize
window.addEventListener("resize", createGrid);
