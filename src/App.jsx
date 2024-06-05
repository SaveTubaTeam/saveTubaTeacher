import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TableExample from './components/TableExample'
import './App.css'
import { Container } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container>
        <div>
          <h1>Hello</h1>
          <TableExample /> {TableExample}
        </div>
      </Container>
    </>
  )
}

export default App