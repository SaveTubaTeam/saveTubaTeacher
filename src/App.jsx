import React, { useState } from 'react';
import viteLogo from '/vite.svg'
import TableExample from './components/TableExample'
import './App.css'
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
    <div className="grid-container">
      <NavigationBar/> {NavigationBar}
        <div className="adjustclass">
          <div>
            <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
          </div>
          <div>
            <LessonSelect chapter={selectedChapter} onChange={(lesson) => setSelectedLesson(lesson)} />
          </div>
          <div>
            <ActivitySelect chapter={selectedChapter} lesson={selectedLesson} />
          </div>
          <div className="dayrange">
            <DateSlider/> {DateSlider}
          </div>
          <div id="button22">
            <BasicButtonGroup /> {BasicButtonGroup}
          </div>
        </div>
        <div className="completionTime" >
          <TableExample /> {TableExample}
        </div>
    </div>
    </>
  )
}

export default App;

