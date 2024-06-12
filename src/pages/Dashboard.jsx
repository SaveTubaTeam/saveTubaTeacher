import React, { useState } from 'react';
import TableExample from '../components/TableExample';
import ChapterSelect from '../components/ChapterSelect';
import LessonSelect from '../components/LessonSelect';
import ActivitySelect from '../components/ActivitySelect';
import '../App.css';
import DateSlider from '../components/DateSlider';
import CompletionTimeLine from '../components/Charts/CompletionTimeLine';
import ActivityCompletionBar from '../components/Charts/ActivityCompletionBar';
import AssignmentCompletionPieChart from '../components/Charts/AssignmentCompletionPieChart';
import TimeButtonGroup from '../components/TimeButtonGroup';
import NavigationBar from '../components/NavigationBar'

function Dashboard() {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  return (
    <>
      <div className="grid-container">
        <NavigationBar />
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
            <DateSlider />
          </div>
          <div id="button22">
            <span>
              <TimeButtonGroup />
            </span>
          </div>
        </div>
        <div className="completionTime">
          <TableExample chapter={selectedChapter} lesson={selectedLesson} activity={selectedActivity} />
        </div>
        <div id="activitycomp">
          <ActivityCompletionBar />
        </div>
        <div>
          <CompletionTimeLine />
        </div>
        <div>
          <AssignmentCompletionPieChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;