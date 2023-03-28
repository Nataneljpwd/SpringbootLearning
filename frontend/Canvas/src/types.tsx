export type pixelProps={
    color:string
};
export type modeButtonProps = {
    selected?:boolean,
    icon:any,
    onClick:()=>void
};
export type canvasProps={
    rows:number,
    cols:number,
};
export type action={
    type:string,
    pos?:number[],
    color?:string,
    dimensions?:number[],
    mode?:string
};
export type state = {
    pixels:string[][],
    drawings:{pos:number[],color:string}[][],
    mouseDown:boolean,
    color:string,
    mode:string,
    redoArray:{pos:number[],color:string}[][],
}


