import styles from "../styles/styles.module.css"
import { faEraser, faFillDrip, faPaintbrush, faRedo, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import { useContext, useState } from "react";
import { DispatchContext, GlobalStateContext, StateContext } from "../contexts/ReducerContext";
import { GlobalState, state } from "../types";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import refresh from "../api/refresh";


export default function CanvasOptions() {
    //@ts-ignore
    const dispatch = useContext<({ }) => state>(DispatchContext);
    //@ts-ignore
    const state = useContext<state>(StateContext);
    const globalState = useContext<GlobalState>(GlobalStateContext);

    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [hover, setHover] = useState(false);

    const changeColor = (color: string) => {
        dispatch({ type: "CHANGE_COLOR", color: color });
    }
    const getInverseColor = (color: string) => {
        if (color[0] == "#") color = color.slice(1);
        if (color.length === 3) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }
        let r: number = 255 - parseInt(color.slice(0, 2), 16),
            g: number = 255 - parseInt(color.slice(2, 4), 16),
            b: number = 255 - parseInt(color.slice(4, 6), 16);
        color = "#" + padZero(r.toString(16), r.toString(16).length) + padZero(g.toString(16), g.toString(16).length) + padZero(b.toString(16), b.toString(16).length);
        return color;
    }

    function padZero(str: string, len: number) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    const handleClicked = () => {
        if (collapsed && hover) {
            setCollapsed(false);
        }
    }
    const handleMouseEnter = () => {
        if (!state.mouseDown) {
            setHover(true);
        }
    }

    function saveCanvas(state: state) {
        // axios.post("/canvas", {
        //     drawings: state.drawings,
        //     ownerId: globalState.userId
        // }).catch(err => console.log(err, " test"))
        axios.post("/canvas", {}, {
            'Authentication': 'Bearer ' + localStorage.getItem("token")
        })
        // .catch(err => refresh().then(token => localStorage.setItem("token", token)))
    }

    return (
        <div style={{
            background: "linear-gradient(50deg, " + state.color + ", " + getInverseColor(state.color) + ")",
            boxShadow: "0px 0px 10px " + getInverseColor(state.color),
            left: collapsed ? (hover ? "-13vmax" : "-14.8vmax") : "0"
        }}
            onMouseEnter={handleMouseEnter} onMouseLeave={() => setHover(false)} onClick={handleClicked}
            className={styles.canvas_options} >
            <div className={styles.buttonContainer} style={{ width: "100%", display: "flex", justifyContent: "space-around", height: "6vh" }}>
                <IconButton selected={state.mode == "brush"} icon={faPaintbrush} onClick={() => dispatch({ type: "CHANGE_MODE", mode: "brush" })} />
                <IconButton selected={state.mode == "fill"} icon={faFillDrip} onClick={() => dispatch({ type: "CHANGE_MODE", mode: "fill" })} />
                <IconButton selected={state.mode == "eraser"} icon={faEraser} onClick={() => dispatch({ type: "CHANGE_MODE", mode: "eraser" })} />
            </div>
            <div className={styles.buttonContainer}>
                <IconButton icon={faUndo} onClick={() => dispatch({ type: "undo" })} />
                <IconButton icon={faSave} onClick={() => saveCanvas(state)} />
                <IconButton icon={faRedo} onClick={() => dispatch({ type: "redo" })} />
            </div>
            <HexColorPicker onChange={changeColor} color={state.color} style={{ width: "90%", aspectRatio: "1/1" }} />
        </div>
    );

}
