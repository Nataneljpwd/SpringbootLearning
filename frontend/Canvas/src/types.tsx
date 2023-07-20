import { Dispatch } from "react";

export type pixelProps = {
    color: string
};
export type modeButtonProps = {
    selected?: boolean,
    icon: any,
    onClick: () => void
};
export type canvasProps = {
    rows: number,
    cols: number,
    drawings?: { pos: number[], color: string }[][],
};
export type action = {
    type: string,
    pos?: number[],
    color?: string,
    dimensions?: number[],
    mode?: string
    drawings?: { pos: number[], color: string }[][],
};
export type state = {
    pixels: string[][],
    drawings: { pos: number[], color: string }[][],
    mouseDown: boolean,
    color: string,
    mode: string,
    redoArray: { pos: number[], color: string }[][],
}

export type DrawingPreviewProps = {
    id: String,
    // drawings: { pos: number[], color: string }[][],
}

export type GlobalState = {
    page: number,
    canvasSize: { rows: number, cols: number },
    userId: string,
    userName: string,
}
export type GlobalDispatch = {
    dispatch: Dispatch<any>,
}
export type GlobalAction = {
    type: String,
    userId?: string,
    username?: string,
}
