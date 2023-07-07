import { useContext, useEffect } from "react";
import { GlobalStateContext, StateContext } from "../contexts/ReducerContext";
import styles from "../styles/styles.module.css";
import { GlobalState } from "../types";

export default function Home() {
    const state = useContext(GlobalStateContext);

    useEffect(() => {
        const scrolling_function = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                window.removeEventListener('scroll', scrolling_function)
            }
        }
        window.addEventListener('scroll', scrolling_function);
    }, [])
    return (
        <div className={styles.main}>

        </div>
    )
}
