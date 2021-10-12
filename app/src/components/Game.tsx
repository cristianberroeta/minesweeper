import {ChangeEvent, useState} from 'react';
import styles from './Game.module.css';
import {GameBoard} from './GameBoard';

interface Props {}

export const Game: React.FC<Props> = () => {
    const [numberOfRows, setNumberOfRows] = useState(5);
    const [numberOfCols, setNumberOfCols] = useState(5);
    const [numberOfMines, setNumberOfMines] = useState(3);
    const [isGameRunning, setIsGameRunning] = useState(false);
    
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
    }

    return <>
        {
            !isGameRunning ?
            <form className={styles.Game}>
                <input type="number" name="numberOfRows" value={numberOfRows} onChange={handleInputChange} min={1} />
                <input type="number" name="numberOfCols" value={numberOfCols} onChange={handleInputChange} min={1} />
                <input type="number" name="numberOfMines" value={numberOfMines} onChange={handleInputChange} min={0} />
                <button onClick={handleStartNewGame}>Start</button>
            </form>
            :
            <GameBoard numberOfRows={numberOfRows} numberOfCols={numberOfCols} numberOfMines={numberOfMines}/>
        }
    </>
};