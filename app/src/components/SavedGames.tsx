import styles from './SavedGames.module.css';
import {collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {useContext, useEffect, useState} from 'react';
import UserContext from '../store/context/UserContext';
import {Game} from '../store/models/Game';
import {GameBoard} from './GameBoard';
import {useHistory} from 'react-router';

interface Props {
}

export const SavedGames: React.FC<Props> = () => {
    const user = useContext(UserContext);
    const [games, setGames] = useState<Game[] | null>(null);
    const history = useHistory();

    useEffect(() => {
        async function getUserGames() {
            try {
                const db = getFirestore();
                const gamesQuery = query(collection(db, "games"), where("userId", "==", user?.uid));
                const querySnapshot = await getDocs(gamesQuery);
                const fetchedGames: Game[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetchedGames.push({
                        id: doc.id,
                        grid: JSON.parse(data.grid),
                        createdAt: data.createdAt.toDate(),
                        uid: data.uid,
                        timeInSeconds: data.timeInSeconds,
                    });
                });
                setGames(fetchedGames);
            } catch (error) {
                console.log(error);
            }
        }
        getUserGames();
    }, [user]);

    function handleSavedGameClick(game: Game) {
        history.push(`games/${game.id}`);
    }

    return <div className={styles.SavedGames}>
        <h1>SAVED GAMES</h1>
        <ul className={styles.List}>
            {games?.map(game => {
                return <li className={styles.ListItem} key={game.id} onClick={() => handleSavedGameClick(game)}>
                    <GameBoard grid={game.grid} handleCellClick={() => {}} handleCellRightClick={() => {}} />
                    <div className={styles.DescriptionContainer}>
                        <div>
                            <b>Saved at:</b> <span>{game.createdAt.toLocaleString()}</span>
                        </div>
                        <div>
                            <b>Time elapsed:</b> <span>{new Date(game.timeInSeconds * 1000).toISOString().substr(11, 8)}</span>
                        </div>
                    </div>
                </li>;
            })}
        </ul>
    </div>;
};