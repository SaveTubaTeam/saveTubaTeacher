import React, { useEffect, useState } from 'react';
import "./AccountPage.css"
import NavigationBar from '../../components/NavbarComponents/NavigationBar';
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';
import ViewStudentsDialog from '../../components/AccountComponents/ViewStudentsDialog';
import Footer from '../../components/Footer';

//The purpose of this page is to display the teacher's profile and the classes they are teaching
export default function AccountPage() {
  const [viewStudentsDialog, setViewStudentsDialog] = useState(false);
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const teacher = useSelector(selectTeacher);

  function handleViewStudents(classCode) {
    setSelectedClassCode(classCode);
    setViewStudentsDialog(true);
  }

  return (
    <div className="mainContainer">
      <NavigationBar contentType="account" />
      
      <div className="contentContainerGrid">
        <div className="headerAccount">
          A
        </div>

        <div className="sidebarAccount">
          B
        </div>

        <div className="accountContent">
          C
        </div>
      </div>

      <Footer />
    </div>
  );
};


// <div className="profile-container">
//         <h1>Teacher Profile</h1>
//         <p><strong>First Name:</strong> {teacher.firstName}</p>
//         <p><strong>Last Name:</strong> {teacher.lastName}</p>
//         <p><strong>Email:</strong> {teacher.email}</p>
//         <h2>Classes</h2>
//         <ul className="class-list">
//           {teacher.classes && teacher.classes.map((classItem, index) => (
//             <>
//               <li key={index} className="class-item">
//                 <p><strong>Class Code:</strong> {classItem.classCode}</p>
//                 <p><strong>Class Name:</strong> {classItem.className}</p>
//                 <p><strong>Grade Level:</strong> {classItem.gradeLevel}</p>
//                 <p onClick={() => handleViewStudents(classItem.classCode)}><strong>View Students</strong></p>
//               </li>
//             </>
//           ))}
//         </ul>
//       </div>

//       <ViewStudentsDialog 
//         viewStudentsDialog={viewStudentsDialog}
//         setViewStudentsDialog={setViewStudentsDialog}
//         classCode={selectedClassCode}
//       />