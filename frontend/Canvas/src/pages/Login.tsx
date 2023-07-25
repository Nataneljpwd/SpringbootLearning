import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import styles from "../styles/styles.module.css";

function Login() {
    const location = useLocation();
    return (
        <div className={styles.login}>
            <LoginForm message={location.state.message} />
        </div>
    )
}

export default Login;
