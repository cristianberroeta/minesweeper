import {Link} from "react-router-dom";
import {User} from "../store/models/User";
import styles from './Header.module.css';

interface Props {
    user: User | null;
    handleLogout: () => void;
}

export const Header: React.FC<Props> = ({user, handleLogout}) => {
    return <header className={styles.Header}>
        <div>Minesweeper</div>
        <div className={styles.Nav}>
            {user ?
                <>
                    <Link to={`/games/new`}>Start new game</Link>
                    <Link to="/games">Saved games</Link>
                    <button onClick={handleLogout}>Log out</button>
                </>
                :
                null
            }
        </div>
    </header>;
};