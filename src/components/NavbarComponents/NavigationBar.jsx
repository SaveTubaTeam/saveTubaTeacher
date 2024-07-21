import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate, useParams } from "react-router-dom";
import logoWhiteText from "../../assets/logoWhiteText.png";
import ClassButton from "./ClassButton";
import CreateClassButton from "../CreateClassComponent/CreateClassButton";
import CurrentAssignmentCard from "./CurrentAssignmentCard";
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


// <div className="navbar">
//       <div>
//         <Link className="imgs" to="/">
//           <img src={iconic} alt="picture of icon" />
//         </Link>
//       </div>
//       <div className="sss">
//         <ClassButton
//           title="Class 4-A"
//           isHighlighted={highlightedButton === "Grade 1"}
//           onClick={() => setHighlightedButton("Grade 1")}
//         />
//       </div>
//       <div className="sss">
//         <CurrentAssignmentCard
//           email={email}
//           classCode={classCode}
//           assignmentID={assignmentID}
//         />
//       </div>
//       {location.pathname === "/createassignment" ? (
//         <div className="sss">
//           <Link to="/">
//             <FaHome title="Home" size="40px" color="Green" />
//           </Link>
//         </div>
//       ) : (
//         <div className="sss">
//           <Link to="/createassignment">
//             <CiCirclePlus title="Create Assignment" size="40px" color="Green" />
//           </Link>
//         </div>
//       )}
//       <div className="sss">
//         <CreateClassButton title="+" />
//       </div>
//       {location.pathname === "/profile" ? (
//         <div className="sss">
//           <Link to="/">
//             <FaHome title="Home" size="40px" color="Green" />
//           </Link>
//         </div>
//       ) : (
//         <div className="sss">
//           <Link to="/profile">
//             <IoPersonCircleSharp title="Profile" size="40px" color="Green" />
//           </Link>
//         </div>
//       )}
//       <div className="sss">
//         <IoExitOutline title="Logout" size="40px" color="Green" onClick={() => navigate("/class-selection")} />
//       </div>
//       {location.pathname === "/class-selection" ? (
//         <div className="sss">
//           <Link to="/">
//             <FaHome title="Home" size="40px" color="Green" />
//           </Link>
//         </div>
//       ) : (
//         <div className="sss">
//           <Link to="/class-selection">
//             <ImBooks title="Home" size="40px" color="Green" />
//           </Link>
//         </div>
//       )}
//     </div>