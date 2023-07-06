import { createContext } from "react";

export const DispatchContext = createContext(() => { });
export const StateContext = createContext(null);
export const CanvasSizeContext = createContext({});
export const GlobalStateContext = createContext({});
export const GlobalDispatchContext = createContext({});
