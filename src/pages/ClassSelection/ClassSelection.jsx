import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import './ClassSelection.css';
import { getAssignmentsCount } from './classSelectionFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { signOutTeacher } from '../../../redux/teacherSlice';
import { selectTeacher } from '../../../redux/teacherSlice';
import { ClassCard } from './ClassCards';
import { ImPlus } from "react-icons/im";
import { PiSignIn } from "react-icons/pi";

export default function ClassSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teacher = useSelector(selectTeacher);
  const [assignmentsCounts, setAssignmentsCounts] = useState({});

  useEffect(() => {
    async function fetchAssignmentsCounts() {
      // Fetch assignments count for each class
      const assignmentsCounts = {};
      for (const classItem of teacher.classes) {
        console.log(`\tClass ${classItem.classCode}: ${JSON.stringify(classItem, null, 2)}`);
        const count = await getAssignmentsCount(teacher.email, classItem.classCode);
        assignmentsCounts[classItem.classCode] = count;
      }

      setAssignmentsCounts(assignmentsCounts);
    };

    fetchAssignmentsCounts();
  }, [teacher]);

  function CreateAClass() {
    return (
      /* this div takes the .classCard css from ClassCards.css */
      <div className="classCard" id="cardCreateClass">
        <ImPlus title="Create Class" size="0.8rem" style={{ color: 'var(--dark-grey)', paddingRight: '0.6rem' }}/>
        <span style={{ fontWeight: 600, color: 'var(--dark-grey)' }}>Create a Class</span>
      </div>
    )
  }

  async function handleLogout() {
    try {
      console.log("LOGGING OUT USER");
      await auth.signOut();
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
    } catch(error) {
      console.error("ERROR LOGGING OUT:", error);
    } finally {
      navigate('/login');
    }
  }
  
  return (
    <>
      <div id="classSelectionContainer">
        {/* <h1>Welcome, {teacher.firstName} {teacher.lastName}</h1> */}
        <h2>Your Classrooms</h2>
        <h4 style={{ paddingTop: '0.7rem' }}>2024-2025</h4>
        <div className="classesGrid">
          {/* see: https://stackoverflow.com/questions/49268267/dealing-with-an-empty-array-when-using-map-in-react */}
          {teacher.classes.length && teacher.classes.map((classItem, index) => (
            <ClassCard 
              key={index} 
              classItem={classItem}
              assignmentsCount={assignmentsCounts[classItem.classCode] || null}
            />
          ))}
          <CreateAClass />
        </div>
      </div>

      <div className="footer">
        <button id="backToLoginIcon" onClick={handleLogout}>
            <PiSignIn title="Back to Login" size="25px" />
        </button>

        <button id="createClassButton">
          <ImPlus title="Create Class" size="0.8rem" style={{ color: 'var(--light)', paddingRight: '0.6rem' }}/>
          <span>Create a Class</span>
        </button>
      </div>
    </>
  );
};