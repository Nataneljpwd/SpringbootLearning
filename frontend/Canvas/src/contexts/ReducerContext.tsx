import { createContext } from "react";

export const DispatchContext = createContext(() => { });
export const StateContext = createContext(null);
export const CanvasSizeContext = createContext({});
export const GlobalStateContext = createContext({ page: 0, canvasSize: { rows: 40, cols: 50 } });
export const GlobalDispatchContext = createContext({});
