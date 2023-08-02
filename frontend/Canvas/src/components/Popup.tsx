import styles from "../styles/styles.module.css"

type props = {
    message: string,
    duration: number,//in ms
    components?: any,
}
export default function Popup(props: props) {

    const { message, duration, components } = props;

    const style = {

    }

    return (
        <div className={styles.popup} data-duration={duration}>
            {message}
            {components}
        </div>
    )

}
