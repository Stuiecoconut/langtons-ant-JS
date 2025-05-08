export default class Ant {
  constructor(tiles, row, col) {
    this.tiles = tiles; // reference to the grid
    this.row = row;
    this.col = col;
    this.dir = 0; // 0 = up, 1 = right, 2 = down, 3 = left
  }

  step() {
    const tile = this.tiles[this.row][this.col];

    const isWhite = tile.classList.contains("white");

    // Turn
    this.dir = (this.dir + (isWhite ? 1 : 3)) % 4;

    // Flip tile visually
    tile.classList.toggle("white");

    // Move forward
    if (this.dir === 0) this.row--;
    else if (this.dir === 1) this.col++;
    else if (this.dir === 2) this.row++;
    else if (this.dir === 3) this.col--;

    // Wrap around the grid
    const rowCount = this.tiles.length;
    const colCount = this.tiles[0].length;

    this.row = (this.row + rowCount) % rowCount;
    this.col = (this.col + colCount) % colCount;
  }
}
