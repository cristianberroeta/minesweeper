import {User} from "../store/models/User";
import {Game} from "./Game";
import {LoginForm} from "./LoginForm";
import styles from './Main.module.css';

interface Props {
    user: User | null;
}

export const Main: React.FC<Props> = ({user}) => {
    return <main className={styles.Main}>
        {user ?
            <Game />
            :
            <LoginForm/>
        }
    </main>;
};