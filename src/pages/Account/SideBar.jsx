import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useLocation, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signOutTeacher } from '../../../redux/teacherSlice';
import { PiUserSquareFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineHelpOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import "./SideBar.css";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function SideBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      console.log("LOGGING OUT USER");
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
      await auth.signOut();
    } catch(error) {
      console.error("ERROR LOGGING OUT:", error);
    } finally {
      toast.success(t("success:loggedOut"));
      navigate('/login');
    }
  }

  return (
    <div className="sidebarAccount">
      <nav>
        <NavLink 
          to={`/account`}
          className={({ isActive }) => isActive ? "sidebarSection active" : "sidebarSection"}
          id="sidebarDivider"
        >
          <PiUserSquareFill style={{ margin: '0 0.6rem' }} size="25px" color="var(--black-dark)"/>
          <span>{t("common:account")}</span>
        </NavLink>
      </nav>

      {/* <nav>
        <NavLink 
          to={`/settings`}
          className={({ isActive }) => isActive ? "sidebarSection active" : "sidebarSection"}
          id="sidebarDivider"
        >
          <IoMdSettings style={{ margin: '0 0.8rem' }} size="20px" color="var(--black-dark)"/>
          <span>Settings</span>
        </NavLink>
      </nav> */}

      <nav>
        <NavLink 
          to={`/contact-support`}
          className={({ isActive }) => isActive ? "sidebarSection active" : "sidebarSection"}
        >
          <MdOutlineHelpOutline style={{ margin: '0 0.8rem' }} size="20px" color="var(--black-dark)"/>
          <span>{t("common:help")}</span>
        </NavLink>
      </nav>

      <div className="sidebarSection" onClick={handleLogout}>
          <MdLogout style={{ margin: '0 0.8rem' }} size="20px" color="var(--black-dark)"/>
          <span>{t("common:logOut")}</span>
      </div>
    </div>
  )
}