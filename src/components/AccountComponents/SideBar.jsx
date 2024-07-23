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

export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="sidebarAccount">
      <nav>
        <NavLink 
          to={`/account`}
          className={({ isActive }) => isActive ? "sidebarSection active" : "sidebarSection"}
        >
          <PiUserSquareFill style={{ margin: '0 0.6rem' }} size="25px" color="var(--black-dark)"/>
          <span>Account</span>
        </NavLink>
      </nav>
      <nav>
        <NavLink 
          to={`/settings`}
          className={({ isActive }) => isActive ? "sidebarSection active" : "sidebarSection"}
          id="sidebarDivider"
        >
          <IoMdSettings style={{ margin: '0 0.8rem' }} size="20px" color="var(--black-dark)"/>
          <span>Settings</span>
        </NavLink>
      </nav>

      <nav>
        <NavLink 
          to={`/support`}
          className={({ isActive }) => isActive ? "sidebarSection active" : "sidebarSection"}
        >
          <MdOutlineHelpOutline style={{ margin: '0 0.8rem' }} size="20px" color="var(--black-dark)"/>
          <span>Help</span>
        </NavLink>
      </nav>

      <div className="sidebarSection" onClick={handleLogout}>
          <MdLogout style={{ margin: '0 0.8rem' }} size="20px" color="var(--black-dark)"/>
          <span>Log Out</span>
      </div>
    </div>
  )
}