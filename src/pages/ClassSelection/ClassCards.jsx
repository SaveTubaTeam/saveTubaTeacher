import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ClassSelection.css';
import { ImPlus } from "react-icons/im";

function ClassCard({ classItem, assignmentsCount }) {
   const navigate = useNavigate();
 
   let displayString = "";
   if(assignmentsCount) {
     //checking for singular/plural
     assignmentsCount === 1 ? displayString = `${assignmentsCount} Assignment` : displayString = `${assignmentsCount} Assignments`;
   } else { //still loading data (assignmentsCount is null in ClassSelection.jsx)
     displayString = `Loading...`
   }
 
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
           {classItem.classCode} - {classItem.gradeLevel}
         </span>
       </div>
     
       <div className="cardBottom">
         <span>{displayString}</span>
         <span id="viewStudents">View Students</span>
       </div>
     </div>
   );
 }
 
function CreateAClass() {
   return (
     <div className="classCard" id="cardCreateClass">
       <ImPlus title="Create Class" size="0.8rem" style={{ color: 'var(--dark-grey)', paddingRight: '0.6rem' }}/>
       <span style={{ fontWeight: 600, color: 'var(--dark-grey)' }}>Create a Class</span>
     </div>
   )
}

export { ClassCard, CreateAClass }