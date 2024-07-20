import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ClassCards.css';
import DisplayCode from './DisplayClassCodeModal';

function ClassCard({ classItem, assignmentsCount }) {
  const navigate = useNavigate();
  const [displayCodeVisible, setDisplayCodeVisible] = useState(false);

  let assignmentString = "";
  if(assignmentsCount) {
    //checking for singular/plural
    assignmentsCount === 1 ? assignmentString = `${assignmentsCount} Assignment` : assignmentString = `${assignmentsCount} Assignments`;
  } else { //still loading data (assignmentsCount is null in ClassSelection.jsx)
    assignmentString = `Loading...`
  }

  //regex to match the numbers and letters in the grade string
  const splicedGrade = classItem.gradeLevel.match(/[a-zA-Z]+|[0-9]+/g);
  //console.log(splicedGrade); // e.g. ["Grade", "5"]
 
  function handleClassCardClick(classCode, gradeLevel) {
    localStorage.setItem('selectedClassCode', classCode);
    localStorage.setItem('selectedClassGrade', gradeLevel);
    navigate(`/dashboard/${classCode}`);
  }
 
  return (
    <div className="classCard">
      <div className="cardTop" onClick={() => handleClassCardClick(classItem.classCode, classItem.gradeLevel)}>
        <span>
          {classItem.className}
        </span>
        <span style={{ fontWeight: 500, color: 'var(--dark-grey)', paddingTop: '0.3rem' }}>
          {classItem.classCode} - {splicedGrade[0]} {splicedGrade[1]}
        </span>
      </div>

      <div className="cardBottom">
        <span>{assignmentString}</span>
        <span id="viewClassCode" onClick={() => setDisplayCodeVisible(true)}>Show Class Code</span>
      </div>

      <DisplayCode 
        displayCodeVisible={displayCodeVisible}
        setDisplayCodeVisible={setDisplayCodeVisible}
        classItem={classItem}
      />
    </div>
  );
}

export { ClassCard }