import './App.css'

import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawingPage from './pages/DrawingPage';
import Home from './pages/Home';
import { CanvasSizeContext, GlobalDispatchContext, GlobalStateContext } from './contexts/ReducerContext';
import { useEffect, useReducer } from 'react';
import { GlobalState, GlobalAction } from './types';
import Login from './pages/Login';
import Register from './pages/Register';
import { useApi } from './api/api';



const initState: GlobalState = {
    userName: "",
    page: 0,
    canvasSize: { rows: 40, cols: 50 },
    userId: "",
}
function App() {
    const [globalState, dispatch] = useReducer(reducer, initState);
    const api = useApi();
    useEffect(() => {
        api.get("/user")
            .then(data => data.data)
            .then(data => dispatch({ type: "SET_USER_INFO", username: data.userName, userId: data.id }));
    }, [])
    return (
        <div className="App">
            <GlobalStateContext.Provider value={globalState}>
                <GlobalDispatchContext.Provider value={dispatch}>
                    <Navbar />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/canvas/:id" element={<DrawingPage />} />
                            <Route path="/canvas/" element={<DrawingPage />} />
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

            case "resetPageNumber":
                return { ...state, page: 0 };

            case "SET_USER_INFO":
                if (!action.userId || !action.username) return state;
                return { ...state, userName: action.username, userId: action.userId };
            default:
                return state;
        }
    }
}

export default App
