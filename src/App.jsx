import { useState } from 'react'
import viteLogo from '/vite.svg'
import TableExample from './components/TableExample'
import './App.css'
import { Container } from '@mui/material'
import BasicButtonGroup from './components/ButtonGroupExample'
import ChapterSelect from './components/ChapterSelect'
import LessonSelect from './components/LessonSelect'
import ActivitySelect from './components/ActivitySelect'
import NavigationBar from './components/NavigationBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar/> {NavigationBar}
      <Container>
        <div>
          <h1 font= 'bold'>Interface Elements</h1>
          <ChapterSelect/> {ChapterSelect}
          <LessonSelect/> {LessonSelect}
          <ActivitySelect/> {ActivitySelect}
          <BasicButtonGroup /> {BasicButtonGroup}
          <TableExample /> {TableExample}
        </div>
      </Container>
    </>
  )
}

export default App