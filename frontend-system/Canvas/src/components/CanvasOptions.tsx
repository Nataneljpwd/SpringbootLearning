import styles from "../styles/styles.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";


export default function CanvasOptions(){
    return (<div className={styles.canvas_options}>
        <button className={styles.modeButton}>
            <FontAwesomeIcon icon={faPaintbrush} style={{color: "#000cb3",}} />
        </button>
        {/* {TODO: add the selectors for col and row amount, color, fill, save, load, reset, undo and redo} */}
    </div>);
}
