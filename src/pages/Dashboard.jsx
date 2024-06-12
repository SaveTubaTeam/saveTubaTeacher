import React, { useState } from 'react';
import { Container } from '@mui/material';
import TableExample from '../components/TableExample';
import ChapterSelect from '../components/ChapterSelect';
import LessonSelect from '../components/LessonSelect';
import ActivitySelect from '../components/ActivitySelect';
import '../App.css';
import DateSlider from '../components/DateSlider';
import ResetGridButton from '../components/ResetGridButton';
import CompletionTimeLine from '../components/Charts/CompletionTimeLine';
import ActivityCompletionBar from '../components/Charts/ActivityCompletionBar';
import TotalActivityCompletionPie from '../components/Charts/TotalActivityCompletionPie';
import TimeButtonGroup from '../components/TimeButtonGroup';

function Dashboard() {
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
        <TimeButtonGroup />
        <TableExample chapter={selectedChapter} lesson={selectedLesson} activity={selectedActivity} /> {/* Pass selected values as props */}
        <ResetGridButton />
        <CompletionTimeLine />
        <ActivityCompletionBar/>
        <TotalActivityCompletionPie/>
      </div>
    </Container>
  );
}

export default Dashboard;