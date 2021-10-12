import {ChangeEvent, useRef, useState} from 'react';
import {Grid} from '../store/models/Cell';
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
                setNumberOfRows(value);
                break;
            case "numberOfCols":
                setNumberOfCols(value);
                break;
            case "numberOfMines":
                setNumberOfMines(value);
                break;
            default:
                break;
        }
    }

    function handleStartNewGame() {
        setIsGameRunning(true);
        setGrid(setMines(createGrid()));
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
                    isVisible: false,
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
                <GameArea numberOfRows={numberOfRows} numberOfCols={numberOfCols} numberOfMines={numberOfMines} grid={grid} />
            </div>
        }
    </>
};