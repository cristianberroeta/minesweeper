import styles from './GameBoard.module.css';

interface Props {
    numberOfRows: number;
    numberOfCols: number;
    numberOfMines: number;
}

export const GameBoard: React.FC<Props> = (props) => {
    return <>
        numberOfRows: {props.numberOfRows};
        numberOfCols: {props.numberOfCols};
        numberOfMines: {props.numberOfMines};
    </>
};