import { useState } from 'react'
import ClassDemo from './ClassDemo'
import FunctionDemo from './FunctionDemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ClassDemo/>
      <FunctionDemo>Child of Function component</FunctionDemo>
    </>
  )
}

export default App
