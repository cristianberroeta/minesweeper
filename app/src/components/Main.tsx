import {User} from "../store/models/User";
import {Game} from "./Game";
import {LoginForm} from "./LoginForm";
import styles from './Main.module.css';

interface Props {
    user: User | null;
    setUser: (user: User) => void;
}

export const Main: React.FC<Props> = ({user, setUser}) => {
    return <main className={styles.Main}>
        {user ?
            <Game />
            :
            <LoginForm setUser={setUser}/>
        }
    </main>;
};