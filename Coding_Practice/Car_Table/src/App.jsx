import { useState } from 'react'
import Table from './components/table'
import FilteredTable from './components/FilteredTable'
import './table.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Table/>
    <FilteredTable/>
    </>
  )
}

export default App
