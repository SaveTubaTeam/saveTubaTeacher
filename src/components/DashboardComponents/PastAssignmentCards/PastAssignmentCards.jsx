import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAssignmentsData, convertIDToName } from "../../../data/dataFunctions";
import moment from "moment";

export default function PastAssignmentCards({ email, classCode }) {
  const [currentAssignments, setCurrentAssignments] = useState([]);
  const [pastAssignments, setPastAssignments] = useState([]);
  const [assignmentTitles, setAssignmentTitles] = useState([]);
  const [pastAssignmentTitles, setPastAssignmentTitles] = useState([]);
  const [currentTime, setCurrentTime] = useState(
    moment().format("DD/MM/YYYY h:mm:ss a")
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!email || !classCode) return;

      try {
        const assignments = await getAssignmentsData(email, classCode);
        const currentAssignments = [];
        const pastAssignments = [];

        assignments.forEach((assignment) => {
          const assignmentObj = {
            assignmentID: assignment.assignmentID,
            assignmentDateAssigned: moment(assignment.dateAssigned),
            assignmentDateDue: moment(assignment.dateDue),
            assignmentSize: assignment.numActivities,
          };

          if (moment().isAfter(assignmentObj.assignmentDateDue)) {
            pastAssignments.push(assignmentObj);
          } else {
            currentAssignments.push(assignmentObj);
          }
        });

        currentAssignments.sort((a, b) => b.assignmentDateDue - a.assignmentDateDue);
        pastAssignments.sort((a, b) => b.assignmentDateDue - a.assignmentDateDue);

        setCurrentAssignments(
          currentAssignments.map((assignment) => ({
            ...assignment,
            assignmentDateAssigned: assignment.assignmentDateAssigned.format("DD/MM/YYYY h:mm:ss a"),
            assignmentDateDue: assignment.assignmentDateDue.format("DD/MM/YYYY h:mm:ss a"),
          }))
        );
        setPastAssignments(
          pastAssignments.map((assignment) => ({
            ...assignment,
            assignmentDateAssigned: assignment.assignmentDateAssigned.format("DD/MM/YYYY h:mm:ss a"),
            assignmentDateDue: assignment.assignmentDateDue.format("DD/MM/YYYY h:mm:ss a"),
          }))
        );
        
        const titleArr = await convertIDToName(currentAssignments);
        for (let i = 0; i < titleArr.length; i++) {
          titleArr[i].replace(/[0-9]/g, '');
          titleArr[i] = titleArr[i].substring(2);
        }
        setAssignmentTitles(titleArr);
        const pastArr = await convertIDToName(pastAssignments);
        for (let i = 0; i < pastArr.length; i++) {
          pastArr[i].replace(/[0-9]/g, '');
          pastArr[i] = pastArr[i].substring(2);
        }
        setPastAssignmentTitles(pastArr);
        console.log("Assignments titles:", assignmentTitles);
        console.log("Past Assignments titles:", pastAssignmentTitles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setCurrentTime(moment().format("DD/MM/YYYY h:mm:ss a"));
  }, [email, classCode]);

  const handleSelectAssignment = (assignmentID) => {
    localStorage.setItem('selectedAssignment', JSON.stringify({ email, classCode, assignmentID }));
    window.dispatchEvent(new Event('assignmentSelected'));
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      {currentAssignments.map((assignment, index) => (
        <Card key={assignment.assignmentID} variant="outlined" sx={{ mb: 2 }}>
          <CardContent sx={{ textAlign: "left" }}>
            <Typography variant="h5" component="div">
              {assignmentTitles[index]}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Grade {assignment.assignmentID.substring(1, 2)} - Chapter{" "}
              {assignment.assignmentID.substring(3, 4)} - Lesson{" "}
              {assignment.assignmentID.substring(5, 6)}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              Due Date: {assignment.assignmentDateDue}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              Date Assigned: {assignment.assignmentDateAssigned}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Number of Activities: {assignment.assignmentSize}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleSelectAssignment(assignment.assignmentID)}>
              Select Assignment
            </Button>
          </CardActions>
        </Card>
      ))}
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Past Assignments
      </Typography>
      {pastAssignments.map((assignment, index) => (
        <Card key={assignment.assignmentID} variant="outlined" sx={{ mb: 2 }}>
          <CardContent sx={{ textAlign: "left" }}>
            <Typography variant="h5" component="div">
              {pastAssignmentTitles[index]}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Grade {assignment.assignmentID.substring(1, 2)} - Chapter{" "}
              {assignment.assignmentID.substring(3, 4)} - Lesson{" "}
              {assignment.assignmentID.substring(5, 6)}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              Due Date: {assignment.assignmentDateDue}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              Date Assigned: {assignment.assignmentDateAssigned}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Number of Activities: {assignment.assignmentSize}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleSelectAssignment(assignment.assignmentID)}>
              Select Assignment
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
