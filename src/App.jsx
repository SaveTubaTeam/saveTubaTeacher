import { useState } from 'react';
import { Container } from '@mui/material';
import TableExample from './components/TableExample';
import BasicButtonGroup from './components/ButtonGroupExample';
import ChapterSelect from './components/ChapterSelect';
import LessonSelect from './components/LessonSelect';
import ActivitySelect from './components/ActivitySelect';
import DateSlider from './components/DateSlider';
import './App.css';
import ClassButton from './components/ClassButton';
import Stack from '@mui/material/Stack';


function App() {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');

  return (
    <Container>
      <div>
        <h1 style={{ fontWeight: 'bold' }}>Interface Elements</h1>
        <Stack direction="row" spacing={2}>
          <ClassButton title = "Class 4 - A"/>
          <ClassButton title = "Class 4 - B"/>
        </Stack>
        <DateSlider/>
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
