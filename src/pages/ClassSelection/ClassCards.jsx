import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ClassCards.css';
import DisplayClassCodeModal from './DisplayClassCodeModal';
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';
import { useDispatch } from 'react-redux';
import { selectClass } from '../../../redux/teacherSlice';

function ClassCard({ classItem, assignmentsCount }) {
  const teacher = useSelector(selectTeacher);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
 
  function handleClassCardClick(classItem) {
    dispatch(selectClass({ selectedClass: classItem }));
    navigate(`/dashboard/${classItem.classCode}`);
  }
 
  return (
    <div className="classCard">
      <div className="cardTop" onClick={() => handleClassCardClick(classItem)}>
        <span>
          {classItem.className}
        </span>
        <span style={{ fontWeight: 500, color: 'var(--dark-grey)', paddingTop: '0.3rem' }}>
          {classItem.classCode} - {splicedGrade[0]} {splicedGrade[1]}
        </span>
        <span style={{ fontWeight: 500, color: 'var(--dark-grey)', paddingTop: '0.3rem' }}>
          {teacher.lastName}
        </span>
      </div>

      <div className="cardBottom">
        <span>{assignmentString}</span>
        <span id="viewClassCode" onClick={() => setDisplayCodeVisible(true)}>Show Class Code</span>
      </div>

      <DisplayClassCodeModal 
        displayCodeVisible={displayCodeVisible}
        setDisplayCodeVisible={setDisplayCodeVisible}
        classItem={classItem}
      />
    </div>
  );
}

export { ClassCard }