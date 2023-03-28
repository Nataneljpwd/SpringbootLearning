import './App.css'

import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import DrawingPage from './pages/DrawingPage';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <Navbar />
        <BrowserRouter> 
            <Routes>
              <Route path = "/canvas" element = {<DrawingPage />} />
              <Route path = "/" element = {<Home />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
