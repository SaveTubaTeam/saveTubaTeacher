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
} from "../data/dataFunctions";
import AssignmentCheckbox from "../components/AssignmentCheckbox";

function Dashboard() {
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");

  function FetchAssignmentsData() {
    const email = "testteacher1@gmail.com";
    const array = getAssignmentsData(email);
    return console.log(array);
  }
  function FetchAssignmentData() {
    const email = "testteacher1@gmail.com";
    const grade = "Grade2";
    const chapter = "Chapter2";
    const lesson = "Lesson3";
    const assign = getAssignmentData(grade, chapter, lesson, email);
    return console.log(assign);
  }
  function FetchCompletionsData() {
    const email = "savetuba2023@gmail.com";
    const array = getCompletionsData(email);
    return console.log(array);
  }
  function FetchCompletionData() {
    const email = "savetuba2023@gmail.com";
    const grade = "Grade2";
    const chapter = "Chapter1";
    const lesson = "Lesson1";
    const activity = "Snapshot";
    const completion = getCompletionData(
      grade,
      chapter,
      lesson,
      activity,
      email
    );
    return console.log(completion);
  }

  return (
    <Container>
      <div>
        <FetchAssignmentsData />
        <FetchAssignmentData />
        <FetchCompletionsData />
        <FetchCompletionData />
        <h1 style={{ fontWeight: "bold" }}>Interface Elements</h1>
        <DateSlider />
        <TimeButtonGroup />
        <ChapterSelect onChange={(chapter) => setSelectedChapter(chapter)} />
        <LessonSelect
          chapter={selectedChapter}
          onChange={(lesson) => setSelectedLesson(lesson)}
        />
        <ActivitySelect
          chapter={selectedChapter}
          lesson={selectedLesson}
          onChange={(activity) => setSelectedActivity(activity)}
        />
        <AssignmentCheckbox />
        <TableExample
          chapter={selectedChapter}
          lesson={selectedLesson}
          activity={selectedActivity}
        />{" "}
        <ResetGridButton />
        <CompletionTimeLine />
        <ActivityCompletionBar />
        <TotalActivityCompletionPie />
      </div>
    </Container>
  );
}

export default Dashboard;
