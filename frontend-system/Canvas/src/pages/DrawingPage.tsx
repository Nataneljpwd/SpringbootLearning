import { useReducer } from "react";
import Canvas from "../components/Canvas";
import CanvasOptions from "../components/CanvasOptions";
import { StateContext, DispatchContext } from "../contexts/ReducerContext";
import { action, state } from "../types";



const initState={
    pixels:[["#000000"]],
    drawings:[[]],
    mouseDown:false,
    color:"#FFFFFF",
    mode:"brush"
};

function reducer(state:state,action:action):any{
    switch (action.type) {
        case "CHANGE_MODE":
            if(!action.mode)return {...state};
            state.mode = action.mode;
            return{...state}
        case "CHANGE_COLOR":
            if(!action.color)return {...state};
            state.color = action.color;
            return {...state};

        case "undo":
            let pixToRemove = state.drawings.pop();
            if(!pixToRemove)return {...state};
            for(let pixel of pixToRemove){
                let [r,c] =pixel.pos;
                state.pixels[r][c]="#000000";
            }
            return {...state};
        case "updatePixel":
            if(!state.mouseDown || !action.pos)return {...state};
            let r = action.pos[0];
            let c = action.pos[1];
            // if(r<0 || r>=props.rows || c<0 || c>=props.cols)return {...state};
            state.pixels[r][c]=state.color;
            //check if ew already have the pixel in the drawings
            // for(let i=0;i<state.drawings.length;i++){
            //     for(let j=0;j<state.drawings[i].length;j++){
            //         let d = state.drawings[i][j];
            //         if(d.pos && d.pos[0]==r && d.pos[1]==c && d.color == state.color){
            //             return{...state};
            //         }
            //     }
            // }
            let currDrawings = state.drawings[state.drawings.length-1];
            for(let pixel of currDrawings){
                if(pixel.pos[0]==r && pixel.pos[1]==c)return {...state};
            }
            state.drawings[state.drawings.length-1].push({pos:[r,c],color:state.pixels[r][c]})
            return{...state};

        case "init":
            state.pixels=[];
            if(!action.dimensions)return {...state};
            for(let i=0;i<action.dimensions[0];i++){
                state.pixels.push([]);
                for(let j=0;j<action.dimensions[1];j++){
                    state.pixels[i].push([]);
                    state.pixels[i][j] = "#000000";
                }
            }
            return {...state};

        case "mouseDown":
            state.drawings.push([]);
            return {...state,mouseDown:true};

        case "mouseUp":
            return {...state, mouseDown:false};
        default:
            break;
    }
}

export default function DrawingPage(){


    const [state, dispatch] = useReducer<state,()=>state>(reducer, initState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <Canvas rows={40} cols={50} /> 
                <CanvasOptions />
            </DispatchContext.Provider>
        </StateContext.Provider>
  )
}
