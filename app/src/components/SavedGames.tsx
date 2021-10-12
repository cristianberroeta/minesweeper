import styles from './SavedGames.module.css';

interface Props {
}

export const SavedGames: React.FC<Props> = () => {
    return <div className={styles.SavedGames}>
        <h1>SAVED GAMES</h1>
    </div>;
};