import styles from './LoginForm.module.css';

interface Props {}

export const LoginForm: React.FC<Props> = () => {
    return <form className={styles.LoginForm}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button>Login</button>
    </form>;
};