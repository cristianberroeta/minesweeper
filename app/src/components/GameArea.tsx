import styles from './GameArea.module.css';

interface Props {
    numberOfRows: number;
    numberOfCols: number;
    numberOfMines: number;
}

export const GameArea: React.FC<Props> = (props) => {
    return <>
        numberOfRows: {props.numberOfRows};
        numberOfCols: {props.numberOfCols};
        numberOfMines: {props.numberOfMines};
    </>
};