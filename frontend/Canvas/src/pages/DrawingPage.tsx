import { useContext, useReducer } from "react";
import Canvas from "../components/Canvas";
import CanvasOptions from "../components/CanvasOptions";
import { StateContext, DispatchContext, CanvasSizeContext, GlobalStateContext } from "../contexts/ReducerContext";
import { action, GlobalState, state } from "../types";
import canvasReducer from "../reducers/canvasReducer";
import { useParams } from "react-router-dom";


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
    const { id } = useParams();
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <Canvas rows={globalState.canvasSize.rows} cols={globalState.canvasSize.cols} preview={false} />
                <CanvasOptions />
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
