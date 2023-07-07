import styles from '../styles/styles.module.css';
import { useCallback, useEffect, useRef, useContext, useState } from 'react'
import Pixel from './Pixel'
import { DispatchContext, StateContext } from '../contexts/ReducerContext';
import { canvasProps } from '../types';


function Canvas(props: canvasProps) {
    const dispatch = useContext<any>(DispatchContext);
    const state = useContext<any>(StateContext);
    const ref = useRef(null);
    useEffect(() => {
        const drawings = props.drawings;
        dispatch({ type: "init", dimensions: [props.rows, props.cols] });
    }, []);

    const handleMouseDown = useCallback((e: any) => {
        if (!e.target) return;
        let rect = e.target.getBoundingClientRect();
        let r = Math.floor((e.pageY - rect.top) / (rect.height / props.rows));//
        let c = Math.floor((e.clientX - rect.left) / (window.innerWidth / props.cols));

        if (state.mode == "brush") {
            dispatch({ type: "mouseDown" });
            // updatePixel(Math.floor((e.pageY-rect.top)/(rect.height/props.rows)),Math.floor((e.clientX-rect.left)/(window.innerWidth/props.cols)));
            updatePixel(r, c);
        } else if (state.mode == "fill") {
            dispatch({ type: "fill", pos: [r, c] })
        } else if (state.mode == "eraser") {
            //Todo: handle this
        }
    }, [state]);


    const handleMouseMove = useCallback((e: any) => {
        if (!state.mouseDown) return;
        if (!e.target) return;
        let rect = e.target.getBoundingClientRect();
        updatePixel(Math.floor((e.pageY - rect.top) / (rect.height / props.rows)), Math.floor((e.clientX - rect.left) / (window.innerWidth / props.cols)));
    }, [state]);

    const updatePixel = (row: number, col: number) => {
        dispatch({ type: "updatePixel", pos: [row, col] });
    }

    return (
        <div ref={ref} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => { dispatch({ type: "mouseUp" }) }}
            style={{ gridTemplateColumns: 'repeat(' + props.cols + ',minmax(1px,1fr))', gridTemplateRows: 'repeat(' + props.rows + ',minmax(1px,1fr))' }} className={styles.canvas}>
            {state.pixels.map((row: string[]) => {
                return row.map((pixel: string) => {
                    return (<Pixel color={pixel} />);
                });
            })}
        </div>
    );
}
export default Canvas;

