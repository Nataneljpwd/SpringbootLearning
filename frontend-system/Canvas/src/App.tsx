import './App.css'

import Canvas from './components/Canvas'
import CanvasOptions from './components/CanvasOptions';
import Navbar from './components/Navbar'

function App() {
    let rows=40,cols=50;
  return (
    <div className="App">
        <Navbar />
        <Canvas rows={rows} cols={cols} /> 
        <CanvasOptions />
    </div>
  )
}

export default App
