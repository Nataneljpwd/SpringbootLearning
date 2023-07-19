import { Card, CardActionArea, CardActions, CircularProgress, Fab } from "@mui/material";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useApi } from "../api/api";
import { CanvasSizeContext, GlobalStateContext, StateContext } from "../contexts/ReducerContext";
import useInterval from "../hooks/useInterval";
import styles from "../styles/styles.module.css";
import { DrawingPreviewProps, GlobalState } from "../types";
import Canvas from "./Canvas";
import Pixel from "./Pixel";

type Canvas = {
    drawings: { pos: number[], color: string }[][],
    owner: string,
    id: String,
    ownerId: number,
    favourites: string[],
    remixes: string[]
}

type previewState = {
    pixels: string[][],
    favourites: string[],
    remixes: string[],
    favourited: boolean,
    pixelsHash: string,
    owner: string,
    ownerId: string,
}

const initState: previewState = {
    pixels: [],
    favourites: [],
    remixes: [],
    favourited: false,
    pixelsHash: "",
    owner: "",
    ownerId: "",
}

type action = {
    type: string,
    data?: { drawings: { pos: number[], color: string }[][], owner: string, id: String, ownerId: number, remixes: string[], favourites: string[] },
    favoured?: boolean,
}

const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash;
    }
    return new Uint32Array([hash])[0].toString(36);
};

export default function DrawingPreview(props: DrawingPreviewProps) {


    function reducer(state: previewState, action: action) {
        switch (action.type) {
            case "TOGGLE_FAV":
                return {
                    ...state,
                    favourites: state.favourites.push(globalState.userId),
                    favourited: action.favoured
                }
            case "CONSTRUCT":
                if (!action.data) return state;
                let canvas = constructCanvas(action.data);
                return {
                    ...canvas,
                    favourited: canvas.favourites.includes(globalState.userId),
                    // pixelsHash: simpleHash(JSON.stringify(action.data.drawings)),
                    pixelsHash: ""
                }
            case "UPDATE":
                if (!action.data) return state;
                if (simpleHash(JSON.stringify(action.data.drawings)) == state.pixelsHash) {
                    return {
                        ...state,
                        favourites: action.data.favourites,
                        remixes: action.data.remixes
                    }
                } else {
                    let canvas = constructCanvas(action.data);
                    return { ...canvas, pixelsHash: simpleHash(JSON.stringify(action.data.drawings)) };
                }
        }
    }


    const [pixels, setPixels] = useState<String[][] | undefined>();
    const [fav, setFav] = useState([]);
    const [remixes, setRemixes] = useState([]);
    const globalState = useContext(GlobalStateContext);
    const [state, dispatch] = useReducer(reducer, initState);
    const api = useApi();
    const nav = useNavigate();
    useEffect(() => {
        api.get<Canvas>(`/canvas/${props.id}`)
            .then(canvas => { dispatch({ type: "CONSTRUCT", data: canvas.data }); });
    }, []);
    //add in the backend the favourites and the remixes count that will udate every 30 seconds
    useInterval(async () => await api.get(`/canvas/${props.id}`).then(canvas => canvas), 60);//every 30 seconds

    const toggleFav = () => {
        api.put("/canvas/favourite/" + props.id)
            .then(res => res.data)
            .then(data => dispatch({ type: "TOGGLE_FAV", favoured: data }))
            .catch(err => {
                if (err.response.status == 401) {
                    nav("/login", { state: { msg: "You must be authorized in order to like a canvas" } });
                }
            });
    }
    if (state.pixels) {
        return (
            <Card className={styles.canvasPreviewCard}>
                <CardActionArea component={RouterLink} to={'/canvas/' + props.id} sx={{ width: '100%', height: '100%' }}>
                    <div style={{ gridTemplateColumns: 'repeat(' + globalState.canvasSize.cols + ',minmax(1px,1fr))', gridTemplateRows: 'repeat(' + globalState.canvasSize.rows + ',minmax(1px,1fr))' }} className={styles.canvasPreview}>
                        {state.pixels.map((row: string[]) => {
                            return row.map((pixel: string) => {
                                return (<Pixel color={pixel} />);
                            });
                        })}
                    </div>
                </CardActionArea>
                <CardActions>
                    <Fab color="primary" aria-label="fav" onClick={toggleFav}>
                        {fav.includes(globalState.userId) ? <GradeIcon /> : <GradeOutlinedIcon />}
                    </Fab>
                    <Fab color="primary" aria-label="remix" variant="extended">
                        {remixes.length}
                        Remixes
                    </Fab>
                </CardActions>
            </Card>
        )
    }
    else {
        return (
            <Card className={styles.canvasPreviewCard}>
                <CircularProgress />
            </Card>
        )
    }

    function constructCanvas(canvas: { drawings: { pos: number[], color: string }[][], owner: string, id: String, ownerId: number, favourites: string[], remixes: string[] }) {

        let data = canvas;
        let drawings = data.drawings;
        let px: String[][] = Array.from(Array(globalState.canvasSize.rows), () => new Array(globalState.canvasSize.cols).fill("#000000"));
        for (let i = 0; i < drawings.length; i++) {
            for (let j = 0; j < drawings[i].pixels.length; j++) {
                let pixel = drawings[i].pixels[j].color;
                px[drawings[i].pixels[j].pos[0]][drawings[i].pixels[j].pos[1]] = pixel;
            }
        }
        if (!data.favourites) {
            data.favourites = [];
        }
        if (data.remixes) {
            data.remixes = [];
        }

        return { pixels: px, favourites: data.favourites, remixes: data.remixes };
    }
}
