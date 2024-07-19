import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { convertIDToName, getAssignmentData } from "../../data/dataFunctions";

export default function CurrentAssignmentCard() {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState("");

  const fetchAssignmentData = async (email, classCode, assignmentID) => {
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
      console.log(chapter);
      setLesson(lesson);
      console.log(lesson);
      const assignmentTitleArray = await convertIDToName([assignment]);
      setAssignmentTitle(assignmentTitleArray[0]);
      console.log(assignmentTitle);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleAssignmentSelected = () => {
      const selectedAssignment = JSON.parse(localStorage.getItem("selectedAssignment"));
      if (selectedAssignment) {
        fetchAssignmentData(selectedAssignment.email, selectedAssignment.classCode, selectedAssignment.assignmentID);
      }
    };

    window.addEventListener("assignmentSelected", handleAssignmentSelected);

    return () => {
      window.removeEventListener("assignmentSelected", handleAssignmentSelected);
    };
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card style={{ height: '3vw' }} variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h10" component="div">
            {currentAssignment ? assignmentTitle.replace(/^\d+\. /, "") : "No Assignment selected"}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {currentAssignment ? `${chapter} - ${lesson}` : ""}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary"></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
