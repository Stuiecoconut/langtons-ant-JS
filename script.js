import Ant from "./Ant.js";

let tiles = []; // 2D array [row][col]
let rows, cols;
let ant;
let skipSteps = 0; // Number of steps to skip

const skipSlider = document.getElementById("step-skip-slider");
const skipInput = document.getElementById("step-skip-input");
const addAntButton = document.getElementById("add-ant-button");

skipInput.addEventListener("input", () => {
  const value = parseInt(skipInput.value, 10);
  if (!isNaN(value)) {
    skipSteps = value;
    skipSlider.value = value;
  }
});

skipSlider.addEventListener("input", () => {
  const value = parseInt(skipSlider.value, 10);
  if (!isNaN(value)) {
    skipSteps = value;
    skipInput.value = value;
  }
});

addAntButton.addEventListener("click", () => {
  placeAnt();
});

function main() {
  skipSteps = 0;
  skipInput.value = skipSteps;
  skipSlider.value = skipSteps;
  createGrid();
}

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

function placeAnt() {
  const startCol = Math.floor(cols / 2);
  const startRow = Math.floor(rows / 2);
  ant = new Ant(tiles, startRow, startCol);

  requestAnimationFrame(animate);
}

function animate() {
  for (let i = 0; i < skipSteps + 1; i++) {
    ant.step();
  }
  requestAnimationFrame(animate);
}

window.addEventListener("load", main);
// Optional: Also update on resize
window.addEventListener("resize", createGrid);
