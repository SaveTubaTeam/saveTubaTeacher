import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./AccountPage.css"
import NavigationBar from '../../global-components/NavbarComponents/NavigationBar';
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';
import SideBar from "./SideBar";
import Footer from '../../global-components/Footer';
import { FaUserCircle } from "react-icons/fa";
import Profile from './Profile';
import ContactSupport from './ContactSupport';
import { useTranslation } from 'react-i18next';

//The purpose of this page is to display the teacher's profile and the classes they are teaching
export default function AccountPage({ page }) {

  let content;
  if(page === "profile") {
    content = ( <Profile /> );
  } else if(page === "support") {
    content = ( <ContactSupport /> );
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

        <div className="accountContent">
          {content}
        </div>
      </div>

      <Footer />
    </div>
  );
};

function AccountHeader() {
  const { t } = useTranslation();
  const teacher = useSelector(selectTeacher);

  let userCircle;
  if(teacher.photoURL) {
    userCircle = (
      <img 
        src={teacher.photoURL} 
        alt="User Photo"  
        style={{ width: '80px', height: '80px', marginLeft: '80px', borderRadius: '50%', transform: 'scale(0.8)' }}
        referrerPolicy="no-referrer" /* (not sure if this is working as intended) see: https://stackoverflow.com/questions/73052741/google-profile-picture-not-rendering ALSO SEE: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
      />
    )
  } else {
    userCircle = ( 
      <div id="userCircle">
        <FaUserCircle size="60px" color="var(--black-light)" />
      </div> 
    );
  }

  return (
    <div className="headerAccount">
      {userCircle}

      <div className="profileContainer">
        <span style={{ fontSize: '1.5rem' }}>
          <strong>{`${teacher.firstName} ${teacher.lastName}`}</strong>
        </span>
        <span style={{ fontSize: '1rem', marginTop: '0.2rem' }}>
          {t("common:yourPersonalAccount")}
        </span>
      </div>
      
    </div>
  )
};