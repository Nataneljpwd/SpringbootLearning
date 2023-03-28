import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "../styles/styles.module.css"
import { modeButtonProps } from "../types"


export default function IconButton({selected,icon,onClick}:modeButtonProps){
    if(selected){
        return(
            <button onClick={onClick} className={styles.modeButton}>
                <FontAwesomeIcon icon={icon} size="xs" style={{color: "#FFF",display:"grid",placeItems:"center"}} beatFade />
            </button>
        )
    }else{
        return(
            <button onClick={onClick} className={styles.modeButton} style={{display:"grid",placeItems:"center"}}>
                <FontAwesomeIcon icon={icon} size = "xs" style={{color: "#FFF",}} />
            </button>
        )
    }
}
