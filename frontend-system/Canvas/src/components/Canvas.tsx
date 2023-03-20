import styles from '../styles/styles.module.css';
import {useState, useCallback, useEffect, useRef, useReducer} from 'react'
import Pixel from './Pixel'

type canProps={
    rows:number,
    cols:number,
}

type action={
    type:string,
    pos?:number[],
    color?:string
};



const initState={
    pixels:[["#000000"]],
    drawings:[[]],
    mouseDown:false,
    color:"#FFFFFF"
};

function Canvas(props:canProps){
    const [state,dispatch]=useReducer(reducer,initState);
    const ref=useRef(null);
    useEffect(()=>{
        dispatch({type:"init"});
    },[]);

    const handleMouseDown = useCallback((e:any)=>{
        if(!e.target)return;
        let rect = e.target.getBoundingClientRect();
        dispatch({type:"mouseDown"});
        updatePixel(Math.floor((e.pageY-rect.top)/(rect.height/props.rows)),Math.floor((e.clientX-rect.left)/(window.innerWidth/props.cols)));
    },[state]);


    const handleMouseMove = useCallback((e:any)=>{
        if(!state.mouseDown)return;
        if(!e.target)return;
        let rect = e.target.getBoundingClientRect();
        updatePixel(Math.floor((e.pageY-rect.top)/(rect.height/props.rows)),Math.floor((e.clientX-rect.left)/(window.innerWidth/props.cols)));
    },[state]);

    const updatePixel = (row:number,col:number)=>{
        dispatch({type:"updatePixel",pos:[row,col]});
    }


    return (
        <div ref={ref} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={()=>{dispatch({type:"mouseUp"})}}
            style={{gridTemplateColumns:'repeat('+props.cols+',minmax(1px,1fr))',gridTemplateRows:'repeat('+props.rows+',minmax(1px,1fr))'}} className={styles.canvas}>
            {state.pixels.map((row:string[])=>{
                return row.map((pixel:string)=>{
                    return (<Pixel color={pixel} />);
                }); 
            })}
        </div>
    );
    function reducer(state:any,action:action):any{
        switch (action.type) {
            case "updatePixel":
                if(!state.mouseDown || !action.pos)return {...state};
                let r = action.pos[0];
                let c = action.pos[1];
                if(r<0 || r>=props.rows || c<0 || c>=props.cols)return {...state};
                state.pixels[r][c]=state.color;
                for(let i=0;i<state.drawings.length;i++){
                    for(let j=0;j<state.drawings[i].length;j++){
                            let d = state.drawings[i][j];
                            if(d.pos && d.pos[0]==r && d.pos[1]==c){
                                return{...state};
                            }
                        }
                    }
                state.drawings[state.drawings.length-1].push({pos:[r,c],color:state.pixels[r][c]})
                return{...state};

            case "init":
                state.pixels=[];
                for(let i=0;i<props.rows;i++){
                    state.pixels.push([]);
                    for(let j=0;j<props.cols;j++){
                        state.pixels[i].push([]);
                        state.pixels[i][j].push(30,30,30);
                    }
                }
                return {...state};
            
            case "mouseDown":
                return {...state,mouseDown:true};

            case "mouseUp":
                state.drawings.push([]);
                return {...state, mouseDown:false};
            default:
                break;
        }
    }
}
export default Canvas;

