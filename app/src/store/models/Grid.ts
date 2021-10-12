import {Cell} from "./Cell";

export type Grid = Cell[][];

export function copyGrid(grid: Grid) {
    const newGrid = createGrid(grid.length, grid[0].length);
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex];
            newGrid[rowIndex][colIndex] = {...cell};
        }
    }
    return newGrid;
}

export function createGrid(numberOfRows: number, numberOfCols: number) {
    const grid: Grid = [];
    for (let row = 0; row < numberOfRows; row++) {
        grid.push([]);
        for (let col = 0; col < numberOfCols; col++) {
            grid[row][col] = {
                row,
                col,
                hasMine: false,
                isRevealed: false,
                numberOfMinesAround: 0,
                isFlagged: false,
            };
        }
    }
    return grid;
}

export function setMines(grid: Grid, numberOfMines: number) {
    let minesPlaced = 0;
    while (minesPlaced < numberOfMines && minesPlaced < grid.length * grid[0].length) {
        const row = Math.floor(Math.random() * grid.length);
        const col = Math.floor(Math.random() * grid[0].length);
        if (grid[row][col].hasMine) continue;
        grid[row][col].hasMine = true;
        minesPlaced++;
    }
    return grid;
}

export function setNumberOfMinesAround(grid: Grid) {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex];
            cell.numberOfMinesAround = calculateNumberOfMinesAround(grid, rowIndex, colIndex);
        }
    }
    return grid;
}

function calculateNumberOfMinesAround(grid: Grid, row: number, col: number) {
    let acum = 0;
    const adjacentCells = getAdjacentCells(grid, grid[row][col]);
    for (const adjacentCell of adjacentCells) {
        if (grid[adjacentCell.row][adjacentCell.col].hasMine) acum++;
    }
    return acum;
}

export function revealAdjacentCells(grid: Grid, cell: Cell) {
    revealAdjacentCellsRecursively(grid, cell);
}

function revealAdjacentCellsRecursively(grid: Grid, cell: Cell) {
    const adjacentCells = getAdjacentCells(grid, cell);
    for (const adjacentCell of adjacentCells) {
        if (!adjacentCell.isRevealed && !adjacentCell.hasMine) {
            adjacentCell.isRevealed = true;
            revealAdjacentCellsRecursively(grid, adjacentCell);
        }
    }
}

function getAdjacentCells(grid: Grid, cell: Cell) {
    const adjacentCells = [];
    for (let deltaRow = -1; deltaRow < 2; deltaRow++) {
        for (let deltaCol = -1; deltaCol < 2; deltaCol++) {
            if (deltaRow === 0 && deltaCol === 0) continue;
            const otherRow = cell.row + deltaRow;
            const otherCol = cell.col + deltaCol;
            if (otherRow < 0 || otherCol < 0 || otherRow >= grid.length || otherCol >= grid[0].length) continue;
            adjacentCells.push(grid[otherRow][otherCol]);
        }
    }
    return adjacentCells;
}

export function areAllNonMinesRevealed(grid: Grid) {
    for (const row of grid) {
        for (const cell of row) {
            if (!cell.hasMine && !cell.isRevealed) {
                return false;
            }
        }
    }
    return true;
}

export function revealAllMinesOfGrid(grid: Grid) {
    for (const row of grid) {
        for (const cell of row) {
            if (cell.hasMine && !cell.isRevealed) {
                cell.isRevealed = true;
            }
        }
    }
}