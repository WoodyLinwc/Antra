import { useState } from 'react'
import CarApp from './components/CarApp/CarApp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <CarApp/>
    </>
  )
}

export default App
