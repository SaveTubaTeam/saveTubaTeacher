import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertIDToGradeChapterLesson } from "../../data/dataFunctions";

export default function HeaderDashboard() {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);
  const classObject = useSelector(state => state.currentClass.selectedClass);

  const [assignmentName, setAssignmentName] = useState("No Assignment Selected");

  useEffect(() => {
    if(selectedAssignment) {
      let idArray = convertIDToGradeChapterLesson(selectedAssignment.assignmentID);
      let assignmentString = `Grade ${idArray[0]} / Chapter ${idArray[1]} / Lesson ${idArray[2]}`;
      setAssignmentName(assignmentString);
    }
  }, [selectedAssignment]);

  return (
    <>
      <h1>{classObject.className}</h1>
      <h4 style={{ fontStyle: "italic" }}>{assignmentName}</h4>
    </>
  )
}