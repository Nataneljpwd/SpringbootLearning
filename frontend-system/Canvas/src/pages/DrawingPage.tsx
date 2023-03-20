import Canvas from "../components/Canvas";
import CanvasOptions from "../components/CanvasOptions";
 export default function DrawingPage(){

  return (
    <>
      <Canvas rows={40} cols={50} /> 
      <CanvasOptions />
    </>
  )
}
