import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'; // Adjust the path as needed
import NavigationBar from '../../components/NavbarComponents/NavigationBar';
import ClassStudentsPopup from '../../components/ProfileComponents/ClassStudentsPopup';
import '../../App.css';
import './ClassSelection.css';
import { getStudents } from '../../data/dataFunctions'; // Ensure this path is correct
import CreateClassButton from './CreateClassButton2'; // Ensure this path is correct

const ClassSelection = () => {
  const [email, setEmail] = useState('');
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedClassCode, setSelectedClassCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      setEmail('testteacher1@gmail.com'); // Set the user's email from localStorage
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (email) {
        try {
          const teacherRef = await db.collection('teachers').doc(email).get();
          if (teacherRef.exists) {
            setTeacher(teacherRef.data());
          } else {
            console.log('Teacher not found');
          }
        } catch (error) {
          console.error('Error fetching teacher data:', error);
        }
      }
    };

    fetchTeacherData();
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
      <WelcomeMessage teacherName={teacher.firstName}
                      teacherLastname={teacher.lastName}/>
      <h1>My Classes</h1>
      <div className="year">2024-2025</div>
      <div className="class-list">
        {teacher.classes && teacher.classes.map((classItem, index) => (
          <ClassCard 
            key={index} 
            classItem={classItem} 
            onClassNameClick={handleClassNameClick} 
            onShowStudents={handleShowStudents} 
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

const WelcomeMessage = ({ teacherName, teacherLastname}) => (
  <div>
    <h1>Welcome, {teacherName} {teacherLastname}</h1>
  </div>
);

const ClassCard = ({ classItem, onClassNameClick, onShowStudents }) => (
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
  </div>
);

const AddClassCard = ({ email }) => (
  <div className="class-card add-class-card">
    <CreateClassButton email={email} />
  </div>
);

export default ClassSelection;
