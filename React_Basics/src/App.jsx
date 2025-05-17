import { useState } from 'react'
import CarApp from './components/CarApp/CarApp';
import Timer from './components/Timer/Timer';
import Counter from './components/Counter/Counter';
import Shopping from './components/Shopping/Shopping';
import { ThemeProvider } from './context/ThemeContext';

function App() {

  return (
    <>
      <ThemeProvider>
        <ThemeApp/>
      </ThemeProvider>
      <hr />
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
