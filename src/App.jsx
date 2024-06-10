import React, { useState } from 'react';
import { Container } from '@mui/material';
import TableExample from './components/TableExample';
import BasicButtonGroup from './components/ButtonGroupExample';
import ChapterSelect from './components/ChapterSelect';
import LessonSelect from './components/LessonSelect';
import ActivitySelect from './components/ActivitySelect';
import DiscreteSliderValues from './components/DateSlider'; 
import './App.css';
import DateSlider from './components/DateSlider';

function App() {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  return (
    <Container>
      <div>
        <h1 style={{ fontWeight: 'bold' }}>Interface Elements</h1>
        <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
        <LessonSelect chapter={selectedChapter} onChange={(lesson) => setSelectedLesson(lesson)} />
        <ActivitySelect chapter={selectedChapter} lesson={selectedLesson} onChange={(activity) => setSelectedActivity(activity)} />
        <DateSlider />
        <BasicButtonGroup />
        <TableExample chapter={selectedChapter} lesson={selectedLesson} activity={selectedActivity} /> {/* Pass selected values as props */}
      </div>
    </Container>
  );
}

export default App;
