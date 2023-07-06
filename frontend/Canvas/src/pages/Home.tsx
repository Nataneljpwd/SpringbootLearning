import { StateContext } from "../contexts/ReducerContext";
import styles from "../styles/styles.module.css";

export default function Home() {
    return (
        <div className={styles.main}>
            <StateContext.Provider value={state} >

            </StateContext.Provider>
        </div>
    )
}
