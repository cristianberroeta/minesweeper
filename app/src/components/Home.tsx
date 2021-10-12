import styles from './Home.module.css';

interface Props {
}

export const Home: React.FC<Props> = () => {
    return <div className={styles.Home}>
        <h1>Welcome!</h1>
        <span>You can start a new game or continue where you left</span>
    </div>;
};