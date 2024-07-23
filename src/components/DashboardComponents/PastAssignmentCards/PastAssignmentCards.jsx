import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  getAssignmentsData,
  convertIDToName,
} from "../../../data/dataFunctions";
import moment from "moment";

export default function PastAssignmentCards({ email, classCode }) {
  const [currentAssignments, setCurrentAssignments] = useState([]);
  const [pastAssignments, setPastAssignments] = useState([]);
  const [assignmentTitles, setAssignmentTitles] = useState([]);
  const [assignmentImg, setAssignmentImg] = useState([]);
  const [pastAssignmentTitles, setPastAssignmentTitles] = useState([]);
  const [pastAssignmentImg, setPastAssignmentImg] = useState([]);
  const [currentTime, setCurrentTime] = useState(
    moment().format("DD/MM/YYYY HH:mm:ss")
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
            assignmentDateAssigned: moment(
              assignment.dateAssigned,
              "DD/MM/YYYY"
            ),
            assignmentDateDue: moment(assignment.dateDue, "DD/MM/YYYY"),
            assignmentSize: assignment.numActivities,
          };

          if (moment().isAfter(assignmentObj.assignmentDateDue, "day")) {
            pastAssignments.push(assignmentObj);
          } else {
            currentAssignments.push(assignmentObj);
          }
        });

        currentAssignments.sort((a, b) =>
          b.assignmentDateDue.diff(a.assignmentDateDue)
        );
        pastAssignments.sort((a, b) =>
          b.assignmentDateDue.diff(a.assignmentDateDue)
        );

        setCurrentAssignments(currentAssignments);
        setPastAssignments(pastAssignments);

        const assignmentData = await convertIDToName(currentAssignments);
        const pastAssignmetData = await convertIDToName(pastAssignments);

        let titleArray = [];
        let imgArray = [];
        let pastTitleArray = [];
        let pastImgArray = [];

        for (let i = 0; i < assignmentData.length; i++) {
          titleArray.push(assignmentData[i].title.replace(/^\d+\. /, ""));
          imgArray.push(assignmentData[i].downloadURL);
        }

        for (let i = 0; i < pastAssignmetData.length; i++) {
          pastTitleArray.push(
            pastAssignmetData[i].title.replace(/^\d+\. /, "")
          );
          pastImgArray.push(pastAssignmetData[i].downloadURL);
        }

        console.log("Assignments titles:", titleArray);
        console.log("Assignments images:", imgArray);
        console.log("Past Assignments titles:", pastTitleArray);
        console.log("Past Assignments images:", pastImgArray);

        setAssignmentTitles(titleArray);
        setPastAssignmentTitles(pastTitleArray);
        setAssignmentImg(imgArray);
        setPastAssignmentImg(pastImgArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setCurrentTime(moment().format("DD/MM/YYYY HH:mm:ss"));
    console.log("Current Time:", currentTime);
  }, [email, classCode]);

  const handleSelectAssignment = (assignmentId) => {
    localStorage.setItem(
      "selectedAssignment",
      JSON.stringify({ email, classCode, assignmentId })
    );
    window.dispatchEvent(new Event("assignmentSelected"));
  };

  return (
    <Box sx={{ minWidth: 275, maxHeight: "400px", overflow: "scroll" }}>
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
              Due Date: {assignment.assignmentDateDue.format("DD/MM/YYYY")}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              Date Assigned:{" "}
              {assignment.assignmentDateAssigned.format("DD/MM/YYYY")}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Number of Activities: {assignment.assignmentSize}
            </Typography>
            <img src={assignmentImg[index]} alt={`Assignment ${index}`} style={{height: 100, width: 100}} />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => handleSelectAssignment(assignment.assignmentID)}
            >
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
              Due Date: {assignment.assignmentDateDue.format("DD/MM/YYYY")}
            </Typography>
            <Typography sx={{}} color="text.secondary">
              Date Assigned:{" "}
              {assignment.assignmentDateAssigned.format("DD/MM/YYYY")}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Number of Activities: {assignment.assignmentSize}
            </Typography>
            <img src={pastAssignmentImg[index]} alt={`Assignment ${index}`} style={{height: 100, width: 100}} />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => handleSelectAssignment(assignment.assignmentID)}
            >
              Select Assignment
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
