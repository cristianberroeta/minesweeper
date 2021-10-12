import {useStopwatch} from '../hooks/useStopwatch';
import {Grid} from '../store/models/Cell';
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

    const grid: Grid = createGrid();

    function createGrid() {
        const grid: Grid = [];
        for (let row = 0; row < props.numberOfRows; row++) {
            grid.push([]);
            for (let col = 0; col < props.numberOfCols; col++) {
                grid[row][col] = {
                    row,
                    col,
                    hasMine: false,
                    isVisible: false,
                    numberOfMinesAround: 0,
                };
            }
        }
        return grid;
    }

    return <div className={styles.GameArea}>
        <div className={styles.buttonsContainer}>
            <button>Save</button>
            <button>Exit without saving</button>
        </div>
        <div className={styles.stopwatchContainer}>
            <Stopwatch timeInSeconds={timeInSeconds} />
        </div>
        <div className={styles.gameBoardContainer}>
            <GameBoard grid={grid}/>
        </div>
    </div>;
};