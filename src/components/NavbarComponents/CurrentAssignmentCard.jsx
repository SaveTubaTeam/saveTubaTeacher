import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { convertIDToName, getAssignmentData } from "../../data/dataFunctions";

export default function CurrentAssignmentCard({
  email,
  classCode,
  assignmentID,
}) {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [lesson, setLesson] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!email || !classCode) return;
        
      try {
        let grade = "Grade" + assignmentID.substring(1, 2);
        let chapter = "Chapter" + assignmentID.substring(3, 4);
        let lesson = "Lesson" + assignmentID.substring(5, 6);
        console.log(grade, chapter, lesson);

        const assignment = await getAssignmentData(
          grade,
          chapter,
          lesson,
          email,
          classCode
        );

        setCurrentAssignment(assignment);
        console.log(assignment);

        setChapter(chapter);
        setLesson(lesson);
        const assignmentTitleArray = await convertIDToName([assignment]);
        setAssignmentTitle(assignmentTitleArray[0]);
        console.log(assignmentTitle);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, classCode, assignmentID]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card style={{height: '3vw'}} variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h10" component="div">
          {assignmentID ? assignmentTitle : "No Assignment selected"}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {assignmentID ? {chapter} - {lesson} : ""}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary"></Typography>
      </CardContent>
      </Card>
    </Box>
  );
}
