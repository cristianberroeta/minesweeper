import {Link} from "react-router-dom";
import {User} from "../store/models/User";
import styles from './Header.module.css';

interface Props {
    user: User | null;
}

export const Header: React.FC<Props> = ({user}) => {
    return <header className={styles.Header}>
        {user ?
            <>
                <Link to={`/games/new`}>Start new game</Link>
                <Link to="/games">Saved games</Link>
            </>
            :
            null
        }
    </header>;
};