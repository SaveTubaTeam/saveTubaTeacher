import { useState } from 'react';
import { Container } from '@mui/material';
import TableExample from './components/TableExample';
import BasicButtonGroup from './components/ButtonGroupExample';
import ChapterSelect from './components/ChapterSelect';
import LessonSelect from './components/LessonSelect';
import ActivitySelect from './components/ActivitySelect';
import './App.css';

function App() {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');

  return (
    <Container>
      <div>
        <h1 style={{ fontWeight: 'bold' }}>Interface Elements</h1>
        <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
        <LessonSelect chapter={selectedChapter} onChange={(lesson) => setSelectedLesson(lesson)} />
        <ActivitySelect chapter={selectedChapter} lesson={selectedLesson} />
        <BasicButtonGroup />
        <TableExample />
      </div>
    </Container>
  );
}

export default App;
