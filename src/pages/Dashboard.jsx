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
import { getAssignmentsData, getAssignmentData } from "../data/dataFunctions";

function Dashboard() {
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  
  function FetchAssignmentsData() {
    const email = "testteacher1@gmail.com";
    const array = getAssignmentsData(email);
    return console.log(array);
  }
  function FetchAssignmentData(){
    const email = "testteacher1@gmail.com";
    const grade = "Grade2";
    const chapter = "Chapter2";
    const lesson = "Lesson3";
    const assign = getAssignmentData(grade, chapter, lesson, email);
    return console.log(assign);
  }


  return (
    <Container>
      <div>
        <FetchAssignmentsData />
        <FetchAssignmentData/>
        <h1 style={{ fontWeight: "bold" }}>Interface Elements</h1>
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
        <DateSlider />
        <TimeButtonGroup />
        <TableExample
          chapter={selectedChapter}
          lesson={selectedLesson}
          activity={selectedActivity}
        />{" "}
        {/* Pass selected values as props */}
        <ResetGridButton />
        <CompletionTimeLine />
        <ActivityCompletionBar />
        <TotalActivityCompletionPie />
      </div>
    </Container>
  );
}

export default Dashboard;
