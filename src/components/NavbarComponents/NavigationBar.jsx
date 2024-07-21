import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate, useParams } from "react-router-dom";
import logoWhiteText from "../../assets/logoWhiteText.png";
import "./NavigationBar.css"
import NavBarRightContainer from "./NavBarRightContainer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const classItem = useSelector(state => state.teacher.selectedClass);
  const classCode = classItem.classCode;

  useEffect(() => {
    if(classCode === undefined) {
      navigate("/class-selection");
      console.error("NO CLASSCODE AVAILABLE! pushing back to /class-selection");
    }
  }, [classCode]);

  return (
    <div className="navigationBarContainer">
      <div id="topOverflowColor"></div>

      <div className="navBarLeftContainer">
        <img src={logoWhiteText} alt="Save Tuba" id="whiteTextLogo" />
        
        <nav>
          <NavLink 
            to={`/dashboard/${classCode}`} 
            className={({ isActive }) => isActive ? "navBarTab active" : "navBarTab"}
            id="navBarDashboard"
          >
            Dashboard
          </NavLink>
        </nav>

        <nav>
          <NavLink 
            to={`/create-assignment/${classCode}`}
            className={({ isActive }) => isActive ? "navBarTab active" : "navBarTab"}
            id="navBarCreateAssignment"
          >
            Create Assignment
          </NavLink>
        </nav>

        <nav>
          <NavLink 
            to="/class-selection"
            className={({ isActive }) => isActive ? "navBarTab active" : "navBarTab"}
            id="navBarClassrooms"
          >
            Classrooms
          </NavLink>
        </nav>
      </div>

      <NavBarRightContainer />
    </div>
  );
};

export default Navbar;