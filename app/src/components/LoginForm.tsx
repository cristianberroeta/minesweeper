import styles from './LoginForm.module.css';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {ChangeEvent, useState} from 'react';
import {User} from '../store/models/User';

interface Props {
    setUser: (user: User) => void;
}

export const LoginForm: React.FC<Props> = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginOrSignUp, setIsLoginOrSignUp] = useState<"login" | "signup">("login");

    function handleRegisterOrLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoginOrSignUp === "signup") handleSignUp();
        else handleLogin();
    }

    function handleSignUp() {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user: User = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email ?? "",
                };
                props.setUser(user);
            })
            .catch((error) => {
                alert("There was an error registering");
            });
    }

    function handleLogin() {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user: User = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email ?? "",
                };
                props.setUser(user);
            })
            .catch((error) => {
                alert("There was an error logging in");
            });
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    }

    return <form onSubmit={handleRegisterOrLogin} className={styles.LoginForm}>
        <input type="email" name="email" id="email" placeholder="Enter your name" value={email} onChange={handleInputChange} />
        <input type="password" name="password" id="password" placeholder="And your password" value={password} onChange={handleInputChange} />
        <button>Register</button>
    </form>;
};