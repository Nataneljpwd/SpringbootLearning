import styles from '../styles/styles.module.css';
import {useState, useCallback, useEffect, useRef} from 'react'
import Pixel from './Pixel'
type canProps={
    rows:number,
    cols:number,
}
function Canvas(props:canProps){
    const [pixels,setPixels]=useState<number[][]>([[]]);
    const [drawings,setDrawings] = useState<number[][][]>([[[]]]);
    const [mousedown,setMouseDown] = useState<boolean>(false);
    const ref=useRef(null);
    useEffect(()=>{
        let pix:number[][]=[];
        for(let i=0;i<props.rows*props.cols;i++){
            pix.push([0,0,100]);
        }
        setPixels([...pix]);
    },[]);

    const handleMouseDown = useCallback((e:any)=>{
        if(!e.target)return;
        let rect = e.target.getBoundingClientRect();
        updatePixel(Math.round((e.pageY-rect.top)/(rect.heigt/props.rows)),Math.round((e.clientX-rect.left)/(window.innerWidth/props.cols)));
        setMouseDown(true);
    },[pixels]);


    const handleMouseMove = useCallback((e:any)=>{
        if(!mousedown)return;
        if(!e.target)return;
        let rect = e.target.getBoundingClientRect();
        updatePixel(Math.round((e.pageY-rect.top)/(rect.height/props.rows)),Math.round((e.clientX-rect.left)/(window.innerWidth/props.cols)));
    },[pixels]);
    const isEventOfCanvas = (e:MouseEvent) =>{
        return ref.current && ref.current.contains(e.target);
    }
    const updatePixel = (row:number,col:number)=>{
        let pix:number[][] = [...pixels];
        pix[row*props.cols + col] = [255,255,255];
        setPixels([...pix]);
    }


    return (
        <div ref={ref} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={()=>{setMouseDown(false)}}
            style={{gridTemplateColumns:'repeat('+props.cols+',minmax(1px,1fr))',gridTemplateRows:'repeat('+props.rows+',minmax(1px,1fr))'}} className={styles.canvas}>
            {pixels.map((pixel)=>{
                return (<Pixel color={pixel}/>)
            })}
        </div>
    );
}
export default Canvas;

