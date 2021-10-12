import {useContext} from "react";
import {Link, Route, Switch} from "react-router-dom";
import UserContext from "../store/context/UserContext";
import styles from './Header.module.css';

interface Props {
    handleLogout: () => void;
}

export const Header: React.FC<Props> = ({handleLogout}) => {
    const user = useContext(UserContext);
    
    return <header className={styles.Header}>
        <div>Minesweeper</div>
        <div className={styles.Nav}>
            {user ?
                <>
                    <Switch>
                        <Route path="/games/new">
                            <Link to={`/`}>Home</Link>
                        </Route>
                        <Route path="/">
                            <Link to={`/games/new`}>Start new game</Link>
                        </Route>
                    </Switch>
                    <Link to="/games">Saved games</Link>
                    <button onClick={handleLogout}>Log out</button>
                </>
                :
                null
            }
        </div>
    </header>;
};