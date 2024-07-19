import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import ClassStudentsPopup from '../../components/ProfileComponents/ClassStudentsPopup';
import './ClassSelection.css';
import { getStudents, getAssignmentsData } from '../../data/dataFunctions';
import CreateClassButton from './CreateClassButton2';
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';

const ClassSelection = () => {
  const teacher = useSelector(selectTeacher);
  const email = teacher.email;
  const [students, setStudents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedClassCode, setSelectedClassCode] = useState('');
  const [assignmentsCounts, setAssignmentsCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssignments() {
      // Fetch assignments count for each class
      const assignmentsCounts = {};
      for (const classItem of teacher.classes) {
        const assignments = await getAssignmentsData(email, classItem.classCode);
        assignmentsCounts[classItem.classCode] = assignments.length;
      }
      setAssignmentsCounts(assignmentsCounts);
    };

    fetchAssignments();
  }, [email]);

  const handleShowStudents = async (classCode) => {
    const studentsList = await getStudents(classCode);
    setStudents(studentsList);
    setSelectedClassCode(classCode);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setStudents([]);
  };

  const handleClassNameClick = (classCode, grade) => {
    localStorage.setItem('selectedClassCode', classCode);
    localStorage.setItem('selectedClassGrade', grade);
    navigate(`/dashboard/${classCode}`);
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="App">
      <WelcomeMessage teacherName={teacher.firstName} teacherLastname={teacher.lastName} />
      <h1>My Classes</h1>
      <div className="year">2024-2025</div>
      <div className="class-list">
        {teacher.classes && teacher.classes.map((classItem, index) => (
          <ClassCard 
            key={index} 
            classItem={classItem} 
            onClassNameClick={handleClassNameClick} 
            onShowStudents={handleShowStudents} 
            assignmentsCount={assignmentsCounts[classItem.classCode] || 0}
          />
        ))}
        <AddClassCard email={email} />
      </div>
      <div className="year">2025-2026</div>
      <div className="class-list">
        <AddClassCard email={email} />
        <AddClassCard email={email} />
        <AddClassCard email={email} />
        <AddClassCard email={email} />
      </div>
      <ClassStudentsPopup
        open={popupOpen}
        onClose={handleClosePopup}
        students={students}
        classCode={selectedClassCode}
      />
    </div>
  );
};

const WelcomeMessage = ({ teacherName, teacherLastname }) => (
  <div>
    <h1>Welcome, {teacherName} {teacherLastname}</h1>
  </div>
);

const ClassCard = ({ classItem, onClassNameClick, onShowStudents, assignmentsCount }) => (
  <div className="class-card">
    <div className="yoyy">
      <h2 
        onClick={() => onClassNameClick(classItem.classCode, classItem.gradeLevel)} 
        style={{ cursor: 'pointer' }}
      >
        {classItem.className}
      </h2>
      <button onClick={() => onShowStudents(classItem.classCode)}>View Students</button>
    </div>
    <p>{classItem.gradeLevel}</p>
    <p>Assignments: {assignmentsCount}</p>
  </div>
);

const AddClassCard = ({ email }) => (
  <div className="class-card add-class-card">
    <CreateClassButton email={email} />
  </div>
);

export default ClassSelection;
