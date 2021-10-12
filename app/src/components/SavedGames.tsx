import styles from './SavedGames.module.css';
import {collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {useContext, useEffect, useState} from 'react';
import UserContext from '../store/context/UserContext';
import {Game} from '../store/models/Game';

interface Props {
}

export const SavedGames: React.FC<Props> = () => {
    const user = useContext(UserContext);
    const [games, setGames] = useState<Game[] | null>(null);

    useEffect(() => {
        async function getUserGames() {
            try {
                const db = getFirestore();
                const gamesQuery = query(collection(db, "games"), where("userId", "==", user?.uid));
                const querySnapshot = await getDocs(gamesQuery);
                const fetchedGames: Game[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log("data.createdAt:", data.createdAt);
                    
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

    return <div className={styles.SavedGames}>
        <h1>SAVED GAMES</h1>
        <div>
            {games?.map(game => {
                return <div key={game.id}>
                    <span>{game.createdAt.toISOString()}</span>
                    <span>{new Date(game.timeInSeconds * 1000).toISOString().substr(11, 8)}</span>
                </div>;
            })}
        </div>
    </div>;
};