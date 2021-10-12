import {ChangeEvent, useRef, useState} from 'react';
import {Cell, Grid} from '../store/models/Cell';
import styles from './Game.module.css';
import {GameArea} from './GameArea';

interface Props {}

export const Game: React.FC<Props> = () => {
    const [numberOfRows, setNumberOfRows] = useState(5);
    const [numberOfCols, setNumberOfCols] = useState(5);
    const [numberOfMines, setNumberOfMines] = useState(3);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [grid, setGrid] = useState<Grid>([]);
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = Number.parseInt(event.target.value);
        switch (name) {
            case "numberOfRows":
                setNumberOfRows(Number.isNaN(value) ? 1 : value);
                break;
            case "numberOfCols":
                setNumberOfCols(Number.isNaN(value) ? 1 : value);
                break;
            case "numberOfMines":
                setNumberOfMines(Number.isNaN(value) ? 0 : value);
                break;
            default:
                break;
        }
    }

    function handleStartNewGame() {
        setIsGameRunning(true);
        setGrid(setNumberOfMinesAround(setMines(createGrid())));
    }

    function createGrid() {
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

    function setMines(grid: Grid) {
        let minesPlaced = 0;
        while (minesPlaced < numberOfMines && minesPlaced < numberOfRows * numberOfCols) {
            const row = Math.floor(Math.random() * numberOfRows);
            const col = Math.floor(Math.random() * numberOfCols);
            if (grid[row][col].hasMine) continue;
            grid[row][col].hasMine = true;
            minesPlaced++;
        }
        return grid;
    }

    function setNumberOfMinesAround(grid: Grid) {
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
                if (otherRow < 0 || otherCol < 0 || otherRow >= numberOfRows || otherCol >= numberOfCols) continue;
                if (grid[otherRow][otherCol].hasMine) acum++;
            }
        }
        return acum;
    }

    function handleCellClick(cell: Cell) {
        setGrid(grid => {
            const newGrid = copyGrid(grid);
            if (!cell.isRevealed) {
                cell.isRevealed = true;
            }
            return newGrid;
        })
    }

    function copyGrid(grid: Grid) {
        const newGrid = createGrid();
        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
            const row = grid[rowIndex];
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                const cell = row[colIndex];
                newGrid[rowIndex][colIndex] = {...cell};
            }
        }
        return newGrid;
    }

    return <>
        {
            !isGameRunning ?
            <form className={styles.Game}>
                <input type="number" name="numberOfRows" value={numberOfRows} onChange={handleInputChange} min={1} />
                <input type="number" name="numberOfCols" value={numberOfCols} onChange={handleInputChange} min={1} />
                <input type="number" name="numberOfMines" value={numberOfMines} onChange={handleInputChange} min={0} max={numberOfRows * numberOfCols} />
                <button onClick={handleStartNewGame}>Start</button>
            </form>
            :
            <div className={styles.GameAreaContainer}>
                <GameArea handleCellClick={handleCellClick} numberOfRows={numberOfRows} numberOfCols={numberOfCols} numberOfMines={numberOfMines} grid={grid} />
            </div>
        }
    </>
};