import {Cell} from '../store/models/Cell';
import {GameStatus} from '../store/models/GameStatus';
import {Grid} from '../store/models/Grid';
import styles from './GameArea.module.css';
import {GameBoard} from './GameBoard';
import {Stopwatch} from './Stopwatch';

interface Props {
    timeInSeconds: number;
    handleSaveGame: () => void;
    gameStatus: GameStatus;
    numberOfRows: number;
    numberOfCols: number;
    numberOfMines: number;
    grid: Grid;
    handleCellClick: (cell: Cell) => void;
    handleCellRightClick: (cell: Cell) => void;
}

export const GameArea: React.FC<Props> = (props) => {
    const gameStatusMessage: Record<GameStatus, string> = {
        "lost": "You lost",
        "won": "You win",
        "notStarted": "placeholder",
        "paused": "placeholder",
        "playing": "placeholder",
    };

    const gameStatusVisibility: Record<GameStatus, string> = {
        "lost": "visible",
        "won": "visible",
        "notStarted": "hidden",
        "paused": "hidden",
        "playing": "hidden",
    };

    return <div className={styles.GameArea}>
        <div className={styles.buttonsContainer}>
            <button onClick={props.handleSaveGame}>Save</button>
        </div>
        <div className={styles.gameStatusContainer} style={{visibility: gameStatusVisibility[props.gameStatus] as any}}>
            {gameStatusMessage[props.gameStatus]}
        </div>
        <div className={styles.stopwatchContainer}>
            <Stopwatch timeInSeconds={props.timeInSeconds} />
        </div>
        <div className={styles.gameBoardContainer}>
            <GameBoard
                grid={props.grid}
                handleCellClick={props.handleCellClick}
                handleCellRightClick={props.handleCellRightClick}/>
        </div>
    </div>;
};