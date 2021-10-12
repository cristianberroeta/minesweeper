import styles from './LoginForm.module.css';

interface Props {}

export const LoginForm: React.FC<Props> = () => {
    return <form className={styles.LoginForm}>
        <input type="email" name="email" id="email" placeholder="Enter your name" />
        <input type="password" name="password" id="password" placeholder="And your password" />
        <button>Register / Login</button>
    </form>;
};