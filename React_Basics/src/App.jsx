import { useState } from 'react'
import CarApp from './components/CarApp/CarApp';
import Timer from './components/Timer/Timer';
import Counter from './components/Counter/Counter';
import Shopping from './components/Shopping/Shopping';

function App() {

  return (
    <>
      <CarApp/>
      <hr />
      <Timer/>
      <hr />
      <Counter/>
      <hr />
      <Shopping/>
    </>
  )
}

export default App
