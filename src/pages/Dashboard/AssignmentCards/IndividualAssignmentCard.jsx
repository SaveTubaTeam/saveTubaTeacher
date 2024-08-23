import React, { useEffect, useState } from "react";
import "./IndividualAssignmentCard.css"
import { convertIDToGradeChapterLesson } from "../../../data/dataFunctions";
import { selectAssignment } from "../../../../redux/currentClassSlice";
import { useDispatch } from "react-redux";

export default function IndividualAssignmentCard({ assignmentObject, doGlowAnimation }) {
  const dispatch = useDispatch();

  let idArray = convertIDToGradeChapterLesson(assignmentObject.assignmentID);
  return (
    <div 
      className={`individualAssignmentContainer ${doGlowAnimation ? "glow" : ""}`} 
      key={assignmentObject.assignmentID}
    >

      <div className="cardLeftHalf">

        <div className="cardLeftHalfTop">
        <h4 style={{ margin: "0" }}>
          {`Date Due: ${assignmentObject.dateDue.slice(0, -3)}`}
        </h4>

        <h4 style={{ margin: "0.5rem 0", paddingBottom: '4px' }}>
          {`Lesson: Grade ${idArray[0]} / Chapter ${idArray[1]} / Lesson ${idArray[2]}`}
        </h4>

        <p style={{ margin: "0" }}>
          {`Number of Activities: ${assignmentObject.numActivities}`}
        </p>

        <p style={{ margin: "0" }}>
          {`Date Assigned: ${assignmentObject.dateAssigned.slice(0, -3)}`}
        </p>
        </div>

        <div className="cardLeftHalfBottom">
          <button 
            onClick={() => {
              console.log("SELECTED ASSIGNMENT:", assignmentObject.assignmentID);
              dispatch(selectAssignment({ selectedAssignmentObject: assignmentObject }));
              document.getElementById('assignmentCardsTop').scrollIntoView({ behavior: "instant" });
              //the id "specialStickingPoint" (yes, this is a bad variable name, I am sorry) can be found in PieChartContainer.jsx.
              document.getElementById('specialStickingPoint').scrollIntoView({ behavior: "smooth" });
            }}>
            Select Assignment
          </button>
        </div>

      </div>

      <div className="cardRightHalf">
        <img src={assignmentObject.lessonData.thumbnailDownloadURL} className="thumbnailFillContainer" />
      </div>

    </div>
  )
}