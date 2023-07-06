import { Card, CardActionArea } from "@mui/material";
import styles from "../styles/styles.module.css";
import { Link as RouterLink } from "react-router-dom";
import { DrawingPreviewProps, GlobalContext, GlobalState, state } from "../types";
import { useContext, useEffect } from "react";
import { CanvasSizeContext, StateContext } from "../contexts/ReducerContext";
import Canvas from "./Canvas";
import axios from "axios";


export default function DrawingPreview(props: DrawingPreviewProps) {

    //should be built the same as the big canvas but smaller
    const canvasSize: { rows: number, cols: number } = useContext<any>(CanvasSizeContext);
    const globalState: GlobalState = useContext<any>(GlobalContext);
    useEffect(() => {
        const scrolling_function = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {

                window.removeEventListener('scroll', scrolling_function)
            }
        }
        window.addEventListener('scroll', scrolling_function);
    }, [])
    return (
        <Card>
            <CardActionArea component={RouterLink} to={'/canvases/' + props.id}>
                <Canvas rows={canvasSize.rows} cols={canvasSize.cols}, drawings = {props.drawings} />
            </CardActionArea>
        </Card>
    )
    function fetch() {

    }
}
