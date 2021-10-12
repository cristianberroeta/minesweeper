import {ChangeEvent, useEffect, useState} from 'react';
import {useStopwatch} from '../hooks/useStopwatch';
import {Cell} from '../store/models/Cell';
import {GameStatus} from '../store/models/GameStatus';
import {areAllNonMinesRevealed, Grid, revealAdjacentCells, revealAllMinesOfGrid, setMines, setNumberOfMinesAround} from '../store/models/Grid';
import {copyGrid, createGrid} from '../store/models/Grid';
import styles from './Game.module.css';
import {GameArea} from './GameArea';
import {collection, getFirestore, addDoc} from "firebase/firestore"; 
import {useContext} from 'react';
import UserContext from '../store/context/UserContext';

interface Props {}

export const Game: React.FC<Props> = () => {
    const [numberOfRows, setNumberOfRows] = useState(5);
    const [numberOfCols, setNumberOfCols] = useState(5);
    const [numberOfMines, setNumberOfMines] = useState(3);
    const [grid, setGrid] = useState<Grid>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>("notStarted");
    const {timeInSeconds, startStopwatch, stopStopwatch} = useStopwatch(0);
    const user = useContext(UserContext);

    useEffect(() => {
        function detectHasUserWon() {
            if (hasUserWon()) {
                setGameStatus("won");
                stopStopwatch();
            }
        }
        
        function hasUserWon() {
            return grid.length > 0 && areAllNonMinesRevealed(grid);
        }

        detectHasUserWon();
    }, [grid, stopStopwatch]);
    
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
        setGameStatus("playing");
        startStopwatch();
        setGrid(setNumberOfMinesAround(setMines(createGrid(numberOfRows, numberOfCols), numberOfMines)));
    }

    function handleCellClick(cell: Cell) {
        if (gameStatus !== "playing") return;
        setGrid(grid => {
            const newGrid = copyGrid(grid);
            const newCell = newGrid[cell.row][cell.col];
            if (!newCell.isRevealed) {
                newCell.isRevealed = true;
                if (!newCell.hasMine && newCell.numberOfMinesAround === 0) {
                    revealAdjacentCells(newGrid, newCell);
                }
            }
            return newGrid;
        });
        detectGameOver(cell.row, cell.col);
    }

    function handleCellRightClick(cell: Cell) {
        if (gameStatus !== "playing") return;
        setGrid(grid => {
            const newGrid = copyGrid(grid);
            const newCell = newGrid[cell.row][cell.col];
            if (!newCell.isRevealed) {
                newCell.isFlagged = !newCell.isFlagged;
            }
            return newGrid;
        });
    }

    function detectGameOver(row: number, col: number) {
        if (grid[row][col].hasMine) {
            setGameStatus("lost");
            stopStopwatch();
            revealAllMines();
        }
    }

    function revealAllMines() {
        setGrid(grid => {
            const newGrid = copyGrid(grid);
            revealAllMinesOfGrid(newGrid);
            return newGrid;
        });
    }

    async function handleSaveGame() {
        try {
            const db = getFirestore();
            await addDoc(collection(db, "games"), {
                timeInSeconds: timeInSeconds,
                grid: JSON.stringify(grid),
                userId: user?.uid
            });
            setGameStatus("paused");
            stopStopwatch();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleResumeGame() {
        setGameStatus("playing");
        startStopwatch();
    }

    return <>
        {
            gameStatus === "notStarted" ?
            <form className={styles.Game}>
                <label className={styles.InputContainer}>Number of rows
                    <input className={styles.Input} type="number" name="numberOfRows" value={numberOfRows} onChange={handleInputChange} min={1} />
                </label>
                <label className={styles.InputContainer}>Number of columns
                <input className={styles.Input} type="number" name="numberOfCols" value={numberOfCols} onChange={handleInputChange} min={1} />
                </label>
                <label className={styles.InputContainer}>Number of mines
                <input className={styles.Input} type="number" name="numberOfMines" value={numberOfMines} onChange={handleInputChange} min={0} max={numberOfRows * numberOfCols} />
                </label>
                <button className={styles.StartButton} onClick={handleStartNewGame}>Start</button>
            </form>
            :
            <div className={styles.GameAreaContainer}>
                <GameArea
                    timeInSeconds={timeInSeconds}
                    handleSaveGame={handleSaveGame}
                    handleResumeGame={handleResumeGame}
                    gameStatus={gameStatus}
                    handleCellClick={handleCellClick}
                    handleCellRightClick={handleCellRightClick}
                    numberOfRows={numberOfRows}
                    numberOfCols={numberOfCols}
                    numberOfMines={numberOfMines}
                    grid={grid} />
            </div>
        }
    </>
};