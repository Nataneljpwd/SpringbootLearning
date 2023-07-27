import { useContext, useEffect, useReducer } from "react";
import Canvas from "../components/Canvas";
import CanvasOptions from "../components/CanvasOptions";
import { StateContext, DispatchContext, CanvasSizeContext, GlobalStateContext } from "../contexts/ReducerContext";
import { action, GlobalState, state } from "../types";
import canvasReducer from "../reducers/canvasReducer";
import { useParams } from "react-router-dom";
import { useApi } from "../api/api";


const initState: state = {
    pixels: [["#000000"]],
    drawings: [[]],
    mouseDown: false,
    color: "#ffffff",
    mode: "brush",
    redoArray: [],
};


export default function DrawingPage() {

    const [state, dispatch] = useReducer<state, () => state>(canvasReducer, initState);
    const globalState: GlobalState = useContext(GlobalStateContext);
    const api = useApi();
    const { id } = useParams();
    useEffect(() => {
        if (id || id != null) {
            //we fetch the canvas data from the backend
            api.get(`/canvas/${id}`).then((res) => {
                const { pixels, drawings, mouseDown, color, mode, redoArray } = res.data;
                console.log(drawings.map(el => el.pixels));
                dispatch({ type: "SET_DRAWINGS", drawings: drawings.map(el => el.pixels) });
            })
        }
    }, [])
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <Canvas rows={globalState.canvasSize.rows} cols={globalState.canvasSize.cols} preview={false} />
                <CanvasOptions canvasId={id} />
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
