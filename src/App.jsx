import React, { useState } from 'react';
import TableExample from './components/TableExample';
import BasicButtonGroup from './components/ButtonGroupExample';
import ChapterSelect from './components/ChapterSelect';
import LessonSelect from './components/LessonSelect';
import ActivitySelect from './components/ActivitySelect';
import './App.css';
import DateSlider from './components/DateSlider';
import ResetGridButton from './components/ResetGridButton';
import CompletionTimeLine from './components/Charts/CompletionTimeLine';
import ActivityCompletionBar from './components/Charts/ActivityCompletionBar';
import NavigationBar from './components/NavigationBar'

function App() {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  return (
    <>
    <div className="grid-container">
      <NavigationBar/>
        <div className="adjustclass">
          <div id='asa'>
            <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
          </div>
          <div>
            <LessonSelect chapter={selectedChapter} onChange={(lesson) => setSelectedLesson(lesson)} />
          </div>
          <div>
          <ActivitySelect chapter={selectedChapter} lesson={selectedLesson} onChange={(activity) => setSelectedActivity(activity)} />
          </div>
          <div className="dayrange">
            <DateSlider/>
          </div>
          <div id="button22">
            <span>
            <BasicButtonGroup/>
            </span> 
          </div>
        </div>
        <div className="completionTime" >
          <TableExample chapter={selectedChapter} lesson={selectedLesson} activity={selectedActivity} />
        </div>
    </div>
    </>
  )
}

export default App;
