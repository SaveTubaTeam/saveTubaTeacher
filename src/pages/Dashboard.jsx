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
import NavigationBar from '../components/NavigationBar';
import ResetGridButton from "../components/ResetGridButton";
import CompletionTimeLine from "../components/Charts/CompletionTimeLine";
import ActivityCompletionBar from "../components/Charts/ActivityCompletionBar";
import AssignmentCheckbox from "../components/AssignmentCheckbox";
import ClassButton from "../components/ClassButton";

function Dashboard() {
  const email = "testteacher1@gmail.com";
  const classCode = "000000";
  const grade = "Grade2";
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [highlightedButton, setHighlightedButton] = useState("");

  // function FetchAssignmentCompletion() {
  //   const assignment = "G2C1L1_Mastery";
  //   return console.log(getCompletedPerAssignment(assignment, classCode));
  // }

  return (
    <>
      <div className="grid-container">
        <NavigationBar />
        <div className="adjustclass">
          <div className="dayrange">
            <DateSlider />
          </div>
          <div id="button22">
            <TimeButtonGroup />
          </div>
        </div>
        <div className="completionTime">
          <div className="completionTime2">
            <div className="Buttonsss">
              <div className="select-container">
                <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
              </div>
              <div className="select-container">
                <LessonSelect chapter={selectedChapter} onChange={(lesson) => setSelectedLesson(lesson)} />
              </div>
              <div className="select-container">
                <ActivitySelect chapter={selectedChapter} lesson={selectedLesson} onChange={(activity) => setSelectedActivity(activity)} />
              </div>
            </div>
            <div className="table-container">
              <TableExample chapter={selectedChapter} lesson={selectedLesson} activity={selectedActivity} />
            </div>
          </div>
          <div className="chart-full">
            <ActivityCompletionBar />
          </div>
        </div>
        <div className="additional-charts">
          <CompletionTimeLine />
          <AssignmentCompletionPieChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

