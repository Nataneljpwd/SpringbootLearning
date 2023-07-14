import axios from "axios";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import DrawingPreview from "../components/DrawingPreview";
import { GlobalDispatchContext, GlobalStateContext, StateContext } from "../contexts/ReducerContext";
import styles from "../styles/styles.module.css";
import { GlobalState } from "../types";

export default function Home() {
    const state = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);
    const [canvases, setCanvases] = useState<string[]>([]);
    useEffect(() => {
        const scrolling_function = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                window.removeEventListener('scroll', scrolling_function)
            }
        }
        window.addEventListener('scroll', scrolling_function);
    }, []);
    useEffect(() => {
        fetchCanvases(state.page);
    }, []);

    function fetchCanvases(pgNum: Number): void {

        axios.get(`/canvas?pageNum=${pgNum}`, { 'Authorization': localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : "" })
            .then(can => can.data)
            .then(can => setCanvases(can));
        //@ts-ignore
        dispatch({ type: "addPageNumber" });//TODO: might be a bug where there are limited amount of canvases and it fetches 1 page and then skips canvases
    }
    return (
        <div className={styles.main}>
            <div className={styles.search} ></div>
            <div className={styles.canvasPreviewArea} >
                {canvases.map((canvas: string) => <DrawingPreview id={canvas} />)}
            </div>
        </div>
    )
}
