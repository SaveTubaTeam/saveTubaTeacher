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

  const fetchAssignmentData = async (email, classCode, assignmentID) => {
    if (!email || !classCode || !assignmentID) return;

    try {
      let grade = "Grade" + assignmentID.substring(1, 2);
      let chapter = "Chapter" + assignmentID.substring(3, 4);
      let lesson = "Lesson" + assignmentID.substring(5);

      const assignment = await getAssignmentData(
        grade,
        chapter,
        lesson,
        email,
        classCode
      );

      setCurrentAssignment(assignment);
      setChapter(chapter);
      setLesson(lesson);
      const assignmentTitleArray = await convertIDToName([assignment]);
      setAssignmentTitle(assignmentTitleArray[0].title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAssignmentData(email, classCode, assignmentID);
  }, [email, classCode, assignmentID]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card style={{ height: "3vw" }} variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h10"
              component="div"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {currentAssignment
                ? assignmentTitle.replace(/^\d+\. /, "")
                : "No Assignment selected"}
            </Typography>
            <Typography sx={{ fontSize: 14, fontFamily: "Montserrat, sans-serif" }} color="text.secondary" >
              {currentAssignment ? `${chapter} - ${lesson}` : ""}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
