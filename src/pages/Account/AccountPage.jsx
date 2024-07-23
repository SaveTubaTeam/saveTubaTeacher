import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./AccountPage.css"
import NavigationBar from '../../components/NavbarComponents/NavigationBar';
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';
import ViewStudentsDialog from '../../components/AccountComponents/ViewStudentsDialog';
import SideBar from '../../components/AccountComponents/SideBar';
import Footer from '../../components/Footer';
import { FaUserCircle } from "react-icons/fa";

//The purpose of this page is to display the teacher's profile and the classes they are teaching
export default function AccountPage({ page }) {
  const navigate = useNavigate();
  const [viewStudentsDialog, setViewStudentsDialog] = useState(false);
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const teacher = useSelector(selectTeacher);

  function handleViewStudents(classCode) {
    setSelectedClassCode(classCode);
    setViewStudentsDialog(true);
  }

  let content;
  if(page === "account") {
    content = (
      <div className="accountContent">
        Account
      </div>
    )
  } else if(page === "settings") {
    content = (
      <div className="accountContent">
        Settings
      </div>
    )
  } else if(page === "support") {
    content = (
      <div className="accountContent">
        Support
      </div>
    )
  } else { //this conditional should never happen because our props are hardcoded...
    console.error("ERROR!!! 'page' prop in main.jsx passed into AccountPage is undefined");
    content = null;
  }

  return (
    <div className="mainContainer">
      <NavigationBar contentType="account" />
      
      <div className="contentContainerGrid">

        {/* see bottom of file for AccountHeader def */}
        <AccountHeader />

        <SideBar />

        {content}

      </div>

      <Footer />
    </div>
  );
};

function AccountHeader() {
  const teacher = useSelector(selectTeacher);

  return (
    <div className="headerAccount">
      <div id="userCircle">
        <FaUserCircle size="60px" color="var(--black-light)" />
      </div>

      <div className="profileContainer">
        <span style={{ fontSize: '1.5rem' }}><strong>{`${teacher.firstName} ${teacher.lastName}`}</strong></span>
        <span style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>{teacher.email}</span>
      </div>
      
    </div>
  )
};