import './App.css'

import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawingPage from './pages/DrawingPage';
import Home from './pages/Home';
import { CanvasSizeContext, GlobalStateContext } from './contexts/ReducerContext';
import { useReducer } from 'react';
import { GlobalState, GlobalAction } from './types';

const initState: GlobalState = {
    page: 0,
}
function App() {
    const canvasSize: { rows: number, cols: number } = { rows: 40, cols: 50 };
    const globalState: GlobalState = useReducer(reducer, initState);
    return (
        <div className="App">
            <GlobalStateContext.Provider value={globalState}>
                <CanvasSizeContext.Provider value={canvasSize}>{//TODO: merge the canvas size and global context}
                    <Navbar />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/canvas" element={<DrawingPage />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                </ CanvasSizeContext.Provider >
            </GlobalStateContext.Provider>
        </div>
    )
    function reducer(state: GlobalState, action: GlobalAction): GlobalState {
        switch (action.type) {
            case "addPageNumber":
                return { ...state, page: state.page + 1 };
            default:
                return state;

        }
    }
}

export default App
