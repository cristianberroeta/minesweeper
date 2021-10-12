import styles from './Stopwatch.module.css';

interface Props {
    timeInSeconds: number;
}

export const Stopwatch: React.FC<Props> = (props) => {
    return <div className={styles.Stopwatch}>
        {props.timeInSeconds}
    </div>;
};