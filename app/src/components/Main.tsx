import {useContext} from "react";
import {Route, Switch} from "react-router";
import UserContext from "../store/context/UserContext";
import {User} from "../store/models/User";
import {Game} from "./Game";
import {Home} from "./Home";
import {LoginForm} from "./LoginForm";
import styles from './Main.module.css';
import {SavedGames} from "./SavedGames";

interface Props {
    setUser: (user: User) => void;
}

export const Main: React.FC<Props> = ({setUser}) => {
    const user = useContext(UserContext);
    
    return <main className={styles.Main}>
        {user ?
            <>
                <Switch>
                    <Route path="/games/new">
                        <Game />
                    </Route>
                    <Route path="/games">
                        <SavedGames />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </>
            :
            <LoginForm setUser={setUser}/>
        }
    </main>;
};