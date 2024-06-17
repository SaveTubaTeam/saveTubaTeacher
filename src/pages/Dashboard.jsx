import React, { useState } from "react";
import { Container } from "@mui/material";
import TableExample from "../components/TableExample";
import ChapterSelect from "../components/ChapterSelect";
import LessonSelect from "../components/LessonSelect";
import ActivitySelect from "../components/ActivitySelect";
import "../App.css";
import DateSlider from "../components/DateSlider";
import ResetGridButton from "../components/ResetGridButton";
import CompletionTimeLine from "../components/Charts/CompletionTimeLine";
import ActivityCompletionBar from "../components/Charts/ActivityCompletionBar";
import TotalActivityCompletionPie from "../components/Charts/TotalActivityCompletionPie";
import TimeButtonGroup from "../components/TimeButtonGroup";
import {
  getAssignmentsData,
  getAssignmentData,
  getCompletionData,
  getCompletionsData,
  getStudents,
  getCompletedPerAssignment,
} from "../data/dataFunctions";
import AssignmentCheckbox from "../components/AssignmentCheckbox";

function Dashboard() {
  const email = "testteacher1@gmail.com";
  const classCode = "000000";
  const grade = "Grade2";
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");

  function FetchStudents() {
    const students = getStudents(classCode);
    return console.log(students);
  }

  function FetchAssignmentCompletion() {
    const assignment = "G2C1L1_Mastery";
    return console.log(getCompletedPerAssignment(assignment, classCode));
  }

  return (
    <Container>
      <div>
        {/* <FetchAssignmentsData />
        <FetchAssignmentData />
        <FetchCompletionsData />
        <FetchCompletionData /> */}
        <FetchStudents />
        <FetchAssignmentCompletion />
        <h1 style={{ fontWeight: "bold" }}>Interface Elements</h1>
        <DateSlider />
        <TimeButtonGroup />
        <ChapterSelect
          grade={grade}
          onChange={(chapter) => setSelectedChapter(chapter)}
        />
        <LessonSelect
          grade={grade}
          chapter={selectedChapter}
          onChange={(lesson) => setSelectedLesson(lesson)}
        />
        <ActivitySelect
          grade={grade}
          chapter={selectedChapter}
          lesson={selectedLesson}
          onChange={(activity) => setSelectedActivity(activity)}
        />
        <AssignmentCheckbox />
        <TableExample
          grade={grade}
          chapter={selectedChapter}
          lesson={selectedLesson}
          activity={selectedActivity}
          email={email}
          classCode={classCode}
        />
        <ResetGridButton />
        <CompletionTimeLine />
        <ActivityCompletionBar />
        <TotalActivityCompletionPie />
      </div>
    </Container>
  );
}

export default Dashboard;
