import {Route, Switch} from "react-router";
import {User} from "../store/models/User";
import {Game} from "./Game";
import {Home} from "./Home";
import {LoginForm} from "./LoginForm";
import styles from './Main.module.css';

interface Props {
    user: User | null;
    setUser: (user: User) => void;
}

export const Main: React.FC<Props> = ({user, setUser}) => {
    return <main className={styles.Main}>
        {user ?
            <>
                <Switch>
                    <Route path="/games/new">
                        <Game />
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