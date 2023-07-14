import LoginForm from "../components/LoginForm";
import styles from "../styles/styles.module.css";

function Login() {
    return (
        <div className={styles.login}>
            <LoginForm />
        </div>
    )
}

export default Login;
