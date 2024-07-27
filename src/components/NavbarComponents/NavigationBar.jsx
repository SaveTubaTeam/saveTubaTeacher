import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate, useParams } from "react-router-dom";
import logoWhiteText from "../../assets/logoWhiteText.png";
import "./NavigationBar.css"
import NavBarRightContainer from "./NavBarRightContainer";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function NavigationBar({ contentType }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classItem = useSelector(state => state.teacher.selectedClass);

  /* useEffect(() => {
    if(classItem.classCode === undefined) {
      navigate("/class-selection");
      console.error("NO CLASSCODE AVAILABLE! pushing back to /class-selection");
    }
  }, [classItem.classCode]); */

  let content;
  if(contentType === "dashboard") {
    content = (
      <>
      <nav>
        <NavLink 
          to={`/dashboard/${classItem.classCode}`} 
          className={({ isActive }) => isActive ? "navBarTab active" : "navBarTab"}
          id="navBarDashboard"
        >
          {`${t("common:dashboard")} - ${classItem.className}`}
        </NavLink>
      </nav>

      <nav>
        <NavLink 
          to={`/create-assignment/${classItem.classCode}`}
          className={({ isActive }) => isActive ? "navBarTab active" : "navBarTab"}
          id="navBarCreateAssignment"
        >
          {t("common:createAssignment")}
        </NavLink>
      </nav>
      </>
    );
  } else if(contentType === "account") {
    content = (
      <nav>
        <NavLink 
          to="/class-selection"
          className={({ isActive }) => isActive ? "navBarTab active" : "navBarTab"}
          id="navBarClassrooms"
        >
          {t("common:backToClassrooms")}
        </NavLink>
      </nav>
    );
  }

  return (
    <div className="navigationBarContainer">
      <div id="topOverflowColor"></div>

      <div className="navBarLeftContainer">
        <img src={logoWhiteText} alt="Save Tuba" id="whiteTextLogo" />

        {content}
      </div>

      <NavBarRightContainer />
    </div>
  );
};