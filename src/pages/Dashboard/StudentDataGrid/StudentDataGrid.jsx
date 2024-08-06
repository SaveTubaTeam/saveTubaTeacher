import React, { useState, useEffect } from "react";
import "./StudentDataGrid.css";
import StudentSortingOptions from "./StudentSortingOptions";
import { useSelector } from "react-redux";
import { PiTrashBold } from "react-icons/pi";
import { sortByLastName } from "./sortingFunctions";

//I need to come back to this to fix the dummy completions placeholder once I've done the assignment cards.
export default function StudentDataGrid({ studentsArray }) {
  const [sortedStudentsArray, setSortedStudentsArray] = useState(null);

  useEffect(() => {
    if(studentsArray !== null) {
      //we to sort by last name on initial load
      const sortedArray = sortByLastName([...studentsArray]);
      setSortedStudentsArray(sortedArray);
    }
  }, [studentsArray]);

  return (
    <div className="studentDataGridContainer">

      <div className="studentDataGridHeader">
        <span className="tableSections" style={{ width: '250px', display: 'flex', justifyContent: 'flex-start', marginLeft: '25px' }}>
          Name
        </span>
        <span className="tableSections" style={{ width: '300px', display: 'flex', justifyContent: 'flex-start' }}>
          Completion Rate
        </span>
        <StudentSortingOptions sortedStudentsArray={sortedStudentsArray} setSortedStudentsArray={setSortedStudentsArray} />
      </div>

      <div className="studentList">
      {sortedStudentsArray && sortedStudentsArray.map((student) => (
        <div className="studentItem" key={student.email}>
          <span className="studentListName">{student.firstName} {student.lastName}</span>

          <span style={{ width: '50px', marginRight: '100px' }}>17/20</span>

          <div className="studentListRightContainer">
            <button style={{ fontSize: '0.8rem', padding: '0.7rem 1.2rem' }}>
              View Submissions
            </button>
            <div className="studentListTrashCan">
              <PiTrashBold size="20px" color="var(--black-light)" />
            </div>
          </div>

        </div>
      ))}
      </div>

    </div>
  )
}