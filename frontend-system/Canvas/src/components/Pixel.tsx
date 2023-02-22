import styles from "../styles/styles.module.css"

type pixelProps={
    color:number[]
}
function Pixel(props:pixelProps){
    return(
       <div draggable={false} className={styles.pixel} style={{backgroundColor:'rgb('+props.color[0]+','+props.color[1]+','+props.color[2]+')'}}></div>
    );
}

export default Pixel;
