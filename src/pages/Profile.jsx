// Profile.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import './TeacherProfile.css';
import '../App.css';
import NavigationBar from '../components/NavigationBar';
import { getStudents } from '../data/dataFunctions';
import ClassStudentsPopup from '../components/ClassStudentsPopup';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const teacherSnapshot = await db.collection('teachers').get();
      const teacherList = teacherSnapshot.docs.map(doc => doc.data());
      console.log('Fetched teachers:', teacherList); // Debugging log
      setTeachers(teacherList);
    };

    fetchData();
  }, []);

  const handleShowStudents = async (classCode) => {
    const studentsList = await getStudents(classCode);
    setStudents(studentsList);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setStudents([]);
  };

  return (
    <div className="profiles-container">
      <NavigationBar />
      {teachers.map((teacher, index) => (
        <div key={index} className="profile-container">
          <h1>Teacher Profile</h1>
          <p><strong>First Name:</strong> {teacher.firstName}</p>
          <p><strong>Last Name:</strong> {teacher.lastName}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>Password:</strong> {teacher.password}</p>
          <h2>Classes</h2>
          <ul className="class-list">
            {teacher.classes && teacher.classes.map((classItem, classIndex) => (
              <li key={classIndex} className="class-item">
                <p><strong>Class Code:</strong> <a href="#" onClick={() => handleShowStudents(classItem.classCode)}>{classItem.classCode}</a></p>
                <p><strong>Class Name:</strong> {classItem.className}</p>
                <p><strong>Grade Level:</strong> {classItem.gradeLevel}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ClassStudentsPopup open={popupOpen} onClose={handleClosePopup} students={students} />
    </div>
  );
};

export default Profile;
