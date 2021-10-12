import {useStopwatch} from '../hooks/useStopwatch';
import styles from './GameArea.module.css';
import {GameBoard} from './GameBoard';
import {Stopwatch} from './Stopwatch';

interface Props {
    numberOfRows: number;
    numberOfCols: number;
    numberOfMines: number;
}

export const GameArea: React.FC<Props> = (props) => {
    const timeInSeconds = useStopwatch(0);

    return <div className={styles.GameArea}>
        <div className={styles.buttonsContainer}>
            <button>Save</button>
            <button>Exit without saving</button>
        </div>
        <div className={styles.stopwatchContainer}>
            <Stopwatch timeInSeconds={timeInSeconds} />
        </div>
        <div className={styles.gameBoardContainer}>
            <GameBoard numberOfRows={props.numberOfRows} numberOfCols={props.numberOfCols} numberOfMines={props.numberOfMines}/>
        </div>
    </div>;
};