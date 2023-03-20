import styles from "../styles/styles.module.css"

type pixelProps={
    color:string
}
function Pixel(props:pixelProps){
    return(
       <div draggable={false} className={styles.pixel} style={{backgroundColor:props.color}}></div>
    );
}

export default Pixel;
