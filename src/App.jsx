import { useState } from 'react'
import './App.css'
import SketchPad from './components/Sketchpad'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SketchPad/>
    </>
  )
}

export default App
