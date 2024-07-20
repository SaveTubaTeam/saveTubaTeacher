import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutTeacher } from "../../../redux/teacherSlice";
import { auth } from "../../../firebase";
import iconic from "../../assets/iconpic.png";
import ClassButton from "./ClassButton";
import CreateClassButton from "../CreateClassComponent/CreateClassButton";
import CurrentAssignmentCard from "./CurrentAssignmentCard";
import { CiCirclePlus } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { IoExitOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const Navbar = ({ email, classCode }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedButton, setHighlightedButton] = useState("");
  const [assignmentID, setAssignmentID] = useState(null);

  useEffect(() => {
    const handleAssignmentSelected = () => {
      const selectedAssignment = JSON.parse(
        localStorage.getItem("selectedAssignment")
      );
      if (selectedAssignment) {
        setAssignmentID(selectedAssignment.assignmentId);
      }
    };

    window.addEventListener("assignmentSelected", handleAssignmentSelected);

    return () => {
      window.removeEventListener(
        "assignmentSelected",
        handleAssignmentSelected
      );
    };
  }, []);

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
          classCode={classCode}
          assignmentID={assignmentID}
        />
      </div>
      {location.pathname === "/createassignment" ? (
        <div className="sss">
          <Link to="/">
            <FaHome title="Home" size="40px" color="Green" />
          </Link>
        </div>
      ) : (
        <div className="sss">
          <Link to="/createassignment">
            <CiCirclePlus title="Create Assignment" size="40px" color="Green" />
          </Link>
        </div>
      )}
      <div className="sss">
        <CreateClassButton title="+" />
      </div>
      {location.pathname === "/profile" ? (
        <div className="sss">
          <Link to="/">
            <FaHome title="Home" size="40px" color="Green" />
          </Link>
        </div>
      ) : (
        <div className="sss">
          <Link to="/profile">
            <IoPersonCircleSharp title="Profile" size="40px" color="Green" />
          </Link>
        </div>
      )}
      <div className="sss">
        <IoExitOutline title="Logout" size="40px" color="Green" onClick={() => navigate("/class-selection")} />
      </div>
      {location.pathname === "/class-selection" ? (
        <div className="sss">
          <Link to="/">
            <FaHome title="Home" size="40px" color="Green" />
          </Link>
        </div>
      ) : (
        <div className="sss">
          <Link to="/class-selection">
            <ImBooks title="Home" size="40px" color="Green" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
