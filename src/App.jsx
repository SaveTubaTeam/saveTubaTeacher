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
  const [selectedActivity, setSelectedActivity] = useState('');

  return (
    <>
    <div class="grid-container">
      <NavigationBar/> {NavigationBar}
        <div class="adjustclass">
          <div>
            <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
          </div>
          <div>
            <LessonSelect chapter={selectedChapter} onChange={(lesson) => setSelectedLesson(lesson)} />
          </div>
          <div>
            <ActivitySelect chapter={selectedChapter} lesson={selectedLesson} />
          </div>
          <div class="dayrange">
            <DateSlider/>
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

