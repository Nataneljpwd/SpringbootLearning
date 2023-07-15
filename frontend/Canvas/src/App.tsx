import './App.css'

import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawingPage from './pages/DrawingPage';
import Home from './pages/Home';
import { CanvasSizeContext, GlobalDispatchContext, GlobalStateContext } from './contexts/ReducerContext';
import { useReducer } from 'react';
import { GlobalState, GlobalAction } from './types';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const initState: GlobalState = {
    page: 0,
    canvasSize: { rows: 40, cols: 50 },
}
function App() {
    const [globalState, dispatch] = useReducer(reducer, initState);
    return (
        <div className="App">
            <GlobalStateContext.Provider value={globalState}>
                <GlobalDispatchContext.Provider value={dispatch}>
                    <Navbar />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/canvas" element={<DrawingPage />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </BrowserRouter>
                </GlobalDispatchContext.Provider>
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
