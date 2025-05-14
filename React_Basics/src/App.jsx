import { useState } from 'react'
import CarApp from './components/CarApp/CarApp';
import Timer from './components/Timer/Timer';
import Counter from './components/Counter/Counter';

function App() {

  return (
    <>
      <CarApp/>
      <hr />
      <Timer/>
      <hr />
      <Counter/>
      <hr />
    </>
  )
}

export default App
