import {Grid} from '../store/models/Cell';
import styles from './GameBoard.module.css';

interface Props {
    grid: Grid;
}

export const GameBoard: React.FC<Props> = (props) => {


    return <>
        <table role="grid" className={styles.GameBoard}>
            <tbody>
            {props.grid.map((row, index) => {
                return <tr role="row" key={`${index}`} >
                    {row.map(cell => {
                        return <td key={`${cell.row}-${cell.col}`} role="gridcell">
                            <button>
                                {
                                    cell.hasMine ?
                                    "M"
                                    :
                                    cell.row
                                }
                            </button>
                        </td>;
                    })}
                </tr>;
            })}
            </tbody>
        </table>
    </>;
};