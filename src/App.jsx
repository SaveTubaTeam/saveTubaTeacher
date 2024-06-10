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
import DateSlider from './components/DateSlider'

function App() {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');

  return (
    <>
    <div class="grid-container">
      <NavigationBar/> {NavigationBar}
        <div class="adjustclass">
          <div>
            <ChapterSelect/> {ChapterSelect}
          </div>
          <div>
            <LessonSelect/> {LessonSelect}
          </div>
          <div>
            <ActivitySelect/> {ActivitySelect}
          </div>
          <div class="dayrange">
            <DateSlider/> {DateSlider}
          </div>
          <div id="button22">
            <BasicButtonGroup /> {BasicButtonGroup}
          </div>
        </div>
        <div class="completionTime" >
          <TableExample /> {TableExample}
        </div>
    </div>
    </>
  )
}

export default App;
