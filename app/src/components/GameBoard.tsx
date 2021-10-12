import {Cell} from '../store/models/Cell';
import {Grid} from '../store/models/Grid';
import styles from './GameBoard.module.css';

interface Props {
    grid: Grid;
    handleCellClick: (cell: Cell) => void;
}

export const GameBoard: React.FC<Props> = (props) => {
    function getDisplayValue(cell: Cell) {
        if (!cell.isRevealed && !cell.isFlagged) return null;
        if (!cell.isRevealed && cell.isFlagged) return "🇨🇱";
        if (cell.isRevealed && cell.hasMine) return "💣";
        if (cell.isRevealed && cell.numberOfMinesAround > 0) return cell.numberOfMinesAround;
    }

    return <>
        <table role="grid" className={styles.GameBoard}>
            <tbody>
            {props.grid.map((row, index) => {
                return <tr role="row" key={`${index}`} >
                    {row.map(cell => {
                        return <td key={`${cell.row}-${cell.col}`} role="gridcell">
                            <button onClick={() => props.handleCellClick(cell)}>{getDisplayValue(cell)}</button>
                        </td>;
                    })}
                </tr>;
            })}
            </tbody>
        </table>
    </>;
};