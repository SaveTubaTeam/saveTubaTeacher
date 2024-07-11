import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAssignmentsData, convertIDToName } from "../../../data/dataFunctions";
import moment from 'moment';

export default function PastAssignmentCards({ email, classCode }) {
  const [Assignments, setAssignments] = useState([]);
  const [assignmentTitles, setAssignmentTitles] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment().format("DD/MM/YYYY h:mm:ss a"));

  useEffect(() => {
    const fetchData = async () => {
      if (!email || !classCode) return;

      try {
        const assignments = await getAssignmentsData(email, classCode);
        const totalAssignments = assignments.map((assignment) => ({
          assignmentID: assignment.assignmentID,
          assignmentDateAssigned: assignment.dateAssigned,
          assignmentDueDate: assignment.dueDate,
          assignmentSize: assignment.numActivities,
        }));

        for (const assignment of totalAssignments) {
          assignment.assignmentDateAssigned = moment(
            assignment.assignmentDateAssigned
          ).format("DD/MM/YYYY h:mm:ss a");
          assignment.assignmentDueDate = moment(
            assignment.assignmentDueDate
          ).format("DD/MM/YYYY h:mm:ss a");
        }
        totalAssignments.sort((a, b) => moment(a.assignmentDateAssigned) - moment(b.assignmentDateAssigned));
        setAssignments(totalAssignments);
        setAssignmentTitles(await convertIDToName(totalAssignments));
        console.log("Assignments titles:", assignmentTitles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setCurrentTime(moment().format("DD/MM/YYYY h:mm:ss a"));
  }, [email, classCode]);

  
  return (
    <Box sx={{ minWidth: 275 }}>
      {Assignments.map((assignment, index) => (
        <Card key={assignment.assignmentID} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Assignment Title: {assignmentTitles[index]}
            </Typography>
            <Typography variant="h5" component="div">
              Date Assigned: {assignment.assignmentDateAssigned}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Due Date: {assignment.assignmentDueDate}
            </Typography>
            <Typography variant="body2">
              Number of Activities: {assignment.assignmentSize}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
