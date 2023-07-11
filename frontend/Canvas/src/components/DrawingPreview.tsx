import { Card, CardActionArea } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CanvasSizeContext, GlobalStateContext, StateContext } from "../contexts/ReducerContext";
import styles from "../styles/styles.module.css";
import { DrawingPreviewProps, GlobalState, state } from "../types";
import Canvas from "./Canvas";
import Pixel from "./Pixel";

type Canvas = {
    drawings: { pos: number[], color: string }[][],
    owner: string,
    id: String,
    ownerId: number,
}
export default function DrawingPreview(props: DrawingPreviewProps) {

    const state = useContext(GlobalStateContext);
    const [pixels, setPixels] = useState<String[][] | undefined>();
    useEffect(() => {
        function constructCanvas(drawings: { pixels: { pos: Number[], color: string }[] }[]) {
            let px: String[][] = Array.from(Array(state.canvasSize.rows), () => new Array(state.canvasSize.cols).fill("#000000"));
            for (let i = 0; i < drawings.length; i++) {
                for (let j = 0; j < drawings[i].pixels.length; j++) {
                    let pixel = drawings[i].pixels[j].color;
                    px[drawings[i].pixels[j].pos[0]][drawings[i].pixels[j].pos[1]] = pixel;
                }
            }
            return px;
        }
        axios.get<Canvas>(`/canvas/${props.id}`)
            .then(canvas => { setPixels(constructCanvas(canvas.data.drawings)) })
            .catch(err => console.error(err));
        ;
    }, []);
    if (pixels) {
        return (
            <Card className={styles.canvasPreviewCard}>
                <CardActionArea component={RouterLink} to={'/canvases/' + props.id} sx={{ width: '100%', height: '100%' }}>
                    <div style={{ gridTemplateColumns: 'repeat(' + state.canvasSize.cols + ',minmax(1px,1fr))', gridTemplateRows: 'repeat(' + state.canvasSize.rows + ',minmax(1px,1fr))' }} className={styles.canvasPreview}>
                        {pixels.map((row: string[]) => {
                            return row.map((pixel: string) => {
                                return (<Pixel color={pixel} />);
                            });
                        })}
                    </div>
                </CardActionArea>
            </Card>
        )
    }
    else {
        return (
            <Card className={styles.canvasPreviewCard}></Card>
        )
    }
}
