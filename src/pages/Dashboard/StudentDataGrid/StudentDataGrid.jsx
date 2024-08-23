import React, { useState, useEffect } from "react";
import "./StudentDataGrid.css";
import StudentSortingOptions from "./StudentSortingOptions.jsx";
import { useSelector } from "react-redux";
import { PiTrashBold } from "react-icons/pi";
import { sortByLastName, getStudentCompletionCount } from "./studentSortingFunctions.js";

//I need to come back to this to fix the dummy completions placeholder once I've done the assignment cards.
export default function StudentDataGrid({ studentsArray }) {
  const [sortedStudentsArray, setSortedStudentsArray] = useState(null);
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);

  useEffect(() => {
    if(studentsArray !== null) {
      //we sort by last name on initial load
      const sortedArray = sortByLastName([...studentsArray]);
      setSortedStudentsArray(sortedArray);
    }
  }, [studentsArray]);

  let content;
  if(selectedAssignment) {
    content = (
      sortedStudentsArray && sortedStudentsArray.map((student) => (
        <div className="studentItem" key={student.email}>
          <span className="studentListName">{student.firstName} {student.lastName}</span>

          <span style={{ width: '50px', marginRight: '100px' }}>
            {`${getStudentCompletionCount(student, selectedAssignment.assignmentID)}/${selectedAssignment.numActivities}`}
          </span>

          <div className="studentListRightContainer">
            <button style={{ fontSize: '0.8rem', padding: '0.7rem 1.2rem' }}>
              View Submission
            </button>
            <div className="studentListTrashCan">
              <PiTrashBold size="20px" color="var(--black-light)"/>
            </div>
          </div>

        </div>
      ))
    )
  } else {
    content = (<h4 style={{ fontStyle: "italic", paddingTop: "14rem" }}>No Assignment Selected</h4>);
  }

  return (
    <div className="studentDataGridContainer">

      <div className="studentDataGridHeader">
        <span className="tableSections" style={{ width: '250px', display: 'flex', justifyContent: 'flex-start', marginLeft: '25px' }}>
          Name
        </span>
        <span className="tableSections" style={{ width: '450px', display: 'flex', justifyContent: 'flex-start' }}>
          Activities Completed
        </span>
        <StudentSortingOptions sortedStudentsArray={sortedStudentsArray} setSortedStudentsArray={setSortedStudentsArray} selectedAssignment={selectedAssignment} />
      </div>

      <div className="studentList">
        {content}
      </div>

    </div>
  )
}