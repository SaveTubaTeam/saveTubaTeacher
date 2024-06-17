// TeacherProfile.js
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import './TeacherProfile.css';

const Profile = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const teacherSnapshot = await db.collection('teachers').get();
      const teacherList = teacherSnapshot.docs.map(doc => doc.data());
      console.log('Fetched teachers:', teacherList); // Debugging log
      setTeachers(teacherList);
    };

    fetchData();
  }, []);

  const showAlert = (classCode) => {
    alert(`Students: ${classCode}`);
  };

  return (
    <div className="profiles-container">
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
                <p><strong>Class Code:</strong> <a href="#" onClick={() => showAlert(classItem.classCode)}>{classItem.classCode}</a></p>
                <p><strong>Class Name:</strong> {classItem.className}</p>
                <p><strong>Grade Level:</strong> {classItem.gradeLevel}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Profile;
