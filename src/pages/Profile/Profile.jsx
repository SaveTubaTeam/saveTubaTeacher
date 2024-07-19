import React, { useEffect, useState } from 'react';
import './TeacherProfile.css';
import '../../App.css';
import NavigationBar from '../../components/NavbarComponents/NavigationBar';
import ClassStudentsPopup from '../../components/ProfileComponents/ClassStudentsPopup';
import { getStudents } from '../../data/dataFunctions';
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';

//The purpose of this page is to display the teacher's profile and the classes they are teaching
const Profile = () => {
  const [students, setStudents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const teacher = useSelector(selectTeacher);

  const handleShowStudents = async (classCode) => {
    const studentsList = await getStudents(classCode);
    setStudents(studentsList);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setStudents([]);
  };
  if (!teacher) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profiles-container">
      <NavigationBar />
      <div className="profile-container">
        <h1>Teacher Profile</h1>
        <p><strong>First Name:</strong> {teacher.firstName}</p>
        <p><strong>Last Name:</strong> {teacher.lastName}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <h2>Classes</h2>
        <ul className="class-list">
          {teacher.classes && teacher.classes.map((classItem, index) => (
            <li key={index} className="class-item">
              <p><strong>Class Code:</strong> <button onClick={() => handleShowStudents(classItem.classCode)}>{classItem.classCode}</button></p>
              <p><strong>Class Name:</strong> {classItem.className}</p>
              <p><strong>Grade Level:</strong> {classItem.gradeLevel}</p>
            </li>
          ))}
        </ul>
      </div>
      <ClassStudentsPopup open={popupOpen} onClose={handleClosePopup} students={students} />
    </div>
  );
};

export default Profile;
