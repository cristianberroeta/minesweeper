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
    for (let deltaRow = -1; deltaRow < 2; deltaRow++) {
        for (let deltaCol = -1; deltaCol < 2; deltaCol++) {
            if (deltaRow === 0 && deltaCol === 0) continue;
            const otherRow = row + deltaRow;
            const otherCol = col + deltaCol;
            if (otherRow < 0 || otherCol < 0 || otherRow >= grid.length || otherCol >= grid[0].length) continue;
            if (grid[otherRow][otherCol].hasMine) acum++;
        }
    }
    return acum;
}