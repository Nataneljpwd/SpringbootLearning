import styles from "../styles/styles.module.css"
import { faEraser, faFillDrip, faPaintbrush, faUndo } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import { useContext } from "react";
import { DispatchContext, StateContext } from "../contexts/ReducerContext";
import { state } from "../types";
import { HexColorPicker } from "react-colorful";


export default function CanvasOptions(){
    //@ts-ignore
    const dispatch = useContext<({})=>state>(DispatchContext);
    //@ts-ignore
    const state = useContext<state>(StateContext);
    const changeColor = (color:string) =>{
        dispatch({type:"CHANGE_COLOR",color:color});
    }
    return (
        <div className={styles.canvas_options}>
            <div style={{width:"100%", display:"flex", justifyContent:"space-around", height:"6vh"}}>
                <IconButton selected = {state.mode == "brush"} icon = {faPaintbrush} onClick={()=>dispatch({type:"CHANGE_MODE", mode:"brush"})} />
                <IconButton selected = {state.mode == "fill"} icon = {faFillDrip} onClick={()=>dispatch({type:"CHANGE_MODE", mode:"fill"})} />
                <IconButton selected = {state.mode == "eraser"} icon = {faEraser} onClick={()=>dispatch({type:"CHANGE_MODE", mode:"eraser"})} />
            </div>
            <div>
                <IconButton icon = {faUndo} onClick = {()=>dispatch({type:"undo"})} />
            </div>
            {/* {TODO: add the selectors for col and row amount, color, fill, save, load, reset, undo and redo} */}
            <HexColorPicker onChange={changeColor} color={state.color} style={{width:"90%",aspectRatio:"1/1"}}/>
        </div>
    );
}
