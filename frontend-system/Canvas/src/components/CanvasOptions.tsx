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
    const getInverseColor = (color:string) =>{
        if(color[0] == "#")color = color.slice(1);
        if(color.length === 3){
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }
        let r:number = 255 - parseInt(color.slice(0, 2), 16),
        g:number = 255 - parseInt(color.slice(2, 4), 16),
        b:number = 255 - parseInt(color.slice(4, 6), 16);
        
        color ="#" + padZero(r.toString(16),r.toString(16).length) + padZero(g.toString(16), g.toString(16).length) + padZero(b.toString(16), b.toString(16).length);
        console.log(color);
        
        return color;
    }

    function padZero(str:string, len:number) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    return (
        <div style = {{background:"linear-gradient(50deg, "+ state.color +", "+ getInverseColor(state.color) +")", boxShadow:"0px 0px 10px "+ getInverseColor(state.color) }} className={styles.canvas_options} >
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
