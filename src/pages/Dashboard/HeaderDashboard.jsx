import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTeacher } from "../../../redux/teacherSlice";
import { convertIDToGradeChapterLesson } from "../../data/dataFunctions";
import { useTranslation } from 'react-i18next'; //needed for translations


export default function HeaderDashboard() {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);
  const classObject = useSelector(state => state.currentClass.selectedClass);
  const teacher = useSelector(selectTeacher);
  const { t } = useTranslation(); //needed for translations
  

  const [assignmentName, setAssignmentName] = useState(`${t("common:noAssignmentSelected")}`); //"No Assignment Selected"

  useEffect(() => {
    if(selectedAssignment) {
      let idArray = convertIDToGradeChapterLesson(selectedAssignment.assignmentID);
      // let assignmentString = `Grade ${idArray[0]} / Chapter ${idArray[1]} / Lesson ${idArray[2]}`;
      let assignmentString = `${t("common:grade")} ${idArray[0]} / ${t("common:chapter")} ${idArray[1]} / ${t("common:lesson")} ${idArray[2]}`;
      setAssignmentName(assignmentString);
    }
  }, [selectedAssignment]);

  return (
    <div className="headerDashboardContainer">
      <h1 style={{ fontStyle: "italic", fontSize: "2.1rem" }}>{`${teacher.lastName} - ${classObject.className}`}</h1>
      <div className="assignmentHeaderCard">
        <h4 style={{ fontWeight: "600", padding: "0 20px", paddingTop: "3px" }}>
          {/* {`Lesson: ${assignmentName}`} */}
          {`${t("common:lesson")}: ${assignmentName}`}
        </h4>
      </div>
    </div>
  )
}