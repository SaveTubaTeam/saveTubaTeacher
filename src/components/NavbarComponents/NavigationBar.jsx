import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import iconic from "../../assets/iconpic.png";
import ClassButton from "./ClassButton";
import CreateClassButton from "../CreateClassComponent/CreateClassButton";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import CurrentAssignmentCard from "./CurrentAssignmentCard";
 

import { IoPersonCircleSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { IoExitOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";



const Navbar = ({ email }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedButton, setHighlightedButton] = useState("");

  async function handleLogout() {
    try {
      await auth.signOut();
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
      navigate('/login');
    } catch(error) {
      console.error(`ERROR LOGGING OUT`)
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
      navigate('/login');
    }
  }


  return (
    <div className="navbar">
      <div>
        <Link className="imgs" to="/">
          <img src={iconic} alt="picture of icon" />
        </Link>
      </div>
      <div className="sss">
        <ClassButton
          title="Class 4-A"
          isHighlighted={highlightedButton === "Grade 1"}
          onClick={() => setHighlightedButton("Grade 1")}
        />
      </div>
      <div className="sss">
        <CurrentAssignmentCard
          email={email}
          classCode={"000000"}
          assignmentID={"G2C1L1"}
        />
      </div>
      <div className="sss">
        <CreateClassButton title="+" />
      </div>
      {location.pathname === "/profile" ? (
        <div className="sss">
          <Link to="/">
            <FaHome title="Home" size="40px" color="Green"/>
          </Link>
        </div>
      ) : (
        <div className="sss">
          <Link to="/profile">
            <IoPersonCircleSharp title="Profile" size="40px" color="Green"/>
          </Link>
        </div>
      )}
      <div className="sss">
        <IoExitOutline title="Logout" size="40px" color="Green" onClick={handleLogout} />
      </div>
      {location.pathname == "/createassignment" ? (
        <div className="sss">
          <Link to="/">
            <FaHome title="Home" size="40px" color="Green" />
          </Link>
        </div>
      ) : (
        <div className="sss">
          <Link to="/createassignment">
            <ClassButton title="Create Assignment" />
          </Link>
        </div>
      )}
      {location.pathname == "/classselection" ? (
        <div className="sss">
          <Link to="/">
            <FaHome title="Home" size="40px" color="Green"/>
          </Link>
        </div>
      ) : (
        <div className="sss">
          <Link to="/classselection">
            <ImBooks title="Home" size="40px" color="Green" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;