import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { convertIDToName, getAssignmentData, getAssignmentsData } from "../../data/dataFunctions";

export default function CurrentAssignmentCard({ email, classCode }) {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState("");

  const fetchFirstAssignment = async () => {
    try {
      const assignments = await getAssignmentsData(email, classCode);
      if (assignments.length > 0) {
        const assignmentId = assignments[0].assignmentID;
        await fetchAssignmentData(email, classCode, assignmentId);
      } else {
        console.error("No assignments available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAssignmentData = async (email, classCode, assignmentId) => {
    try {
      let grade = "Grade" + assignmentId.substring(1, 2);
      let chapter = "Chapter" + assignmentId.substring(3, 4);
      let lesson = "Lesson" + assignmentId.substring(5, 6);
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

      const assignmentTitleArray = await convertIDToName([assignment]);
      setAssignmentTitle(assignmentTitleArray[0]);
      console.log(assignmentTitle);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFirstAssignment();

    const handleStorageChange = () => {
      const storedData = JSON.parse(localStorage.getItem('selectedAssignment'));
      if (storedData) {
        fetchAssignmentData(storedData.email, storedData.classCode, storedData.assignmentId);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignmentSelected', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignmentSelected', handleStorageChange);
    };
  }, [email, classCode]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card style={{ height: '3vw' }} variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h10" component="div">
            Current Assignment: {assignmentTitle}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary"></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
