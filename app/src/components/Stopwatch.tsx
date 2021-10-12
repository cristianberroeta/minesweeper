import styles from './Stopwatch.module.css';

interface Props {
    timeInSeconds: number;
}

export const Stopwatch: React.FC<Props> = (props) => {
    return <div className={styles.Stopwatch}>
        {new Date(props.timeInSeconds * 1000).toISOString().substr(11, 8)}
    </div>;
};