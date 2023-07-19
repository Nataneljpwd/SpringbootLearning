import { useContext, useEffect, useState } from "react";
import { useApi } from "../api/api";
import DrawingPreview from "../components/DrawingPreview";
import { GlobalDispatchContext, GlobalStateContext } from "../contexts/ReducerContext";
import styles from "../styles/styles.module.css";

export default function Home() {
    const state = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);
    const [canvases, setCanvases] = useState<string[]>([""]);
    const api = useApi();
    useEffect(() => {
        const scrolling_function = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                fetchCanvases(state.page);
                dispatch({ type: "addPageNumber" });
                window.removeEventListener('scroll', scrolling_function)
            }
        }
        window.addEventListener('scroll', scrolling_function);
    }, []);
    useEffect(() => {
        dispatch({ type: "resetPageNumber" });
        fetchCanvases(state.page);
    }, []);

    function fetchCanvases(pgNum: Number): void {
        api.get<string[]>(`/canvas?pageNum=${pgNum}`)
            .then(can => can.data)
            .then(can => { setCanvases(Array.from(new Set([...canvases, ...can].filter(c => c.length > 10)))); })

        //TODO: might be a bug where there are limited amount of canvases and it fetches 1 page and then skips canvases when fatching later on
    }


    return (
        <div className={styles.main}>
            <div className={styles.search} ></div>
            <div className={styles.canvasPreviewArea} >
                {canvases.map((canvas: string) => canvas.length > 10 && <DrawingPreview id={canvas} />)}
            </div>
        </div>
    )
}
