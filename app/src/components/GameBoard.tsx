import {Grid} from '../store/models/Cell';
import styles from './GameBoard.module.css';

interface Props {
    grid: Grid;
}

export const GameBoard: React.FC<Props> = (props) => {
    return <>
        {props.grid.map(row => {
            return row.map(cell => {
                return <button key={`${cell.row}-${cell.col}`}>{
                    cell.hasMine ?
                    "M"
                    :
                    cell.row
                }</button>;
            });
        })}
    </>;
};