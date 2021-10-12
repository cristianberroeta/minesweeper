import {ChangeEvent, useState} from 'react';
import {Cell} from '../store/models/Cell';
import {Grid, setMines, setNumberOfMinesAround} from '../store/models/Grid';
import {copyGrid, createGrid} from '../store/models/Grid';
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
        setGrid(setNumberOfMinesAround(setMines(createGrid(numberOfRows, numberOfCols), numberOfMines)));
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