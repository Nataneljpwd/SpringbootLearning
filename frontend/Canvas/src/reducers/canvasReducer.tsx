
import { action as canvasAction, state as canvasState } from "../types";

export default function canvasReducer(state: canvasState, action: canvasAction): any {

    function updateCanvas(state: canvasState) {
        const pixels = Array.from(Array(state.pixels.length), () => new Array(state.pixels[0].length).fill("#000000"));
        for (let i = 0; i < state.drawings.length; i++) {
            for (let j = 0; j < state.drawings[i].length; j++) {
                let pixel = state.drawings[i][j];
                let [r, c] = pixel.pos;
                pixels[r][c] = pixel.color;
            }
        }
        return { ...state, pixels: pixels };
    }
    switch (action.type) {
        case "CHANGE_MODE":
            if (!action.mode) return { ...state };
            state.mode = action.mode;
            return { ...state }

        case "CHANGE_COLOR":
            if (!action.color) return { ...state };
            state.color = action.color;
            return { ...state };

        case "SET_DRAWINGS":
            if (!action.drawings) return { ...state };
            state.drawings = action.drawings;
            return updateCanvas(state);

        case "undo":
            let pixToRemove = state.drawings.pop();
            if (state.drawings.length === 0) state.drawings.push([]);
            if (!pixToRemove) return { ...state };
            state.redoArray.push(pixToRemove);
            if (state.redoArray.length > 10) {
                state.redoArray.shift();
            }
            return updateCanvas(state);

        case "redo":
            if (state.redoArray.length == 0) return { ...state };
            let drawing = state.redoArray.pop();
            if (drawing) state.drawings.push(drawing);
            return updateCanvas(state);

        case "updatePixel":
            if (!state.mouseDown || !action.pos) return { ...state };
            let r = action.pos[0];
            let c = action.pos[1];
            let currDrawings = state.drawings[state.drawings.length - 1];
            for (let i = 0; i < currDrawings.length; i++) {
                let pixel = currDrawings[i];
                if (pixel.pos[0] == r && pixel.pos[1] == c) return { ...state };
            }
            state.pixels[r][c] = state.color;
            state.drawings[state.drawings.length - 1].push({ pos: [r, c], color: state.pixels[r][c] })
            return updateCanvas(state);

        case "fill":
            if (!action.pos) return state;
            let [startRow, startCol]: number[] = action.pos;

            //we do a bfs
            let set = new Set();
            set.add(startRow + "," + startCol);
            let q: number[][] = [[startRow, startCol]];
            let dirs: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            state.pixels[startRow][startCol] = state.color;
            state.drawings[state.drawings.length - 1].push({ pos: [startRow, startCol], color: state.color });
            while (q.length !== 0) {
                let pix = q.shift();
                if (!pix) break;
                let [currRow, currCol]: number[] = pix;
                for (let i = 0; i < dirs.length; i++) {
                    let row = currRow + dirs[i][0];
                    let col = currCol + dirs[i][1];
                    if ((!set.has(row + "," + col) && row >= 0 && col >= 0 && row < state.pixels.length && col < state.pixels[0].length) && state.pixels[row][col] != state.color.toLowerCase()) {
                        set.add(row + "," + col);
                        state.pixels[row][col] = state.color;
                        state.drawings[state.drawings.length - 1].push({ pos: [row, col], color: state.color });
                        q.push([row, col]);
                    }
                }
            }
            return { ...state };

        case "init":
            state.pixels = [];
            if (!action.dimensions) return { ...state };
            for (let i = 0; i < action.dimensions[0]; i++) {
                state.pixels.push([]);
                for (let j = 0; j < action.dimensions[1]; j++) {
                    state.pixels[i].push([]);
                    state.pixels[i][j] = "#000000";
                }
            }
            return { ...state };

        case "mouseDown":
            state.drawings.push([]);
            return { ...state, mouseDown: true };

        case "mouseUp":
            return { ...state, mouseDown: false };
        default:
            break;
    }
}
