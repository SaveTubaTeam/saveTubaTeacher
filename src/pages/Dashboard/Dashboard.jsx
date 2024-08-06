import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTeacher } from "../../../redux/teacherSlice";
import "./Dashboard.css"
import CompletionTimeLine from "../../global-components/DashboardComponents/Charts/CompletionTimeLine";
import AssignmentCompletionPieChart from "../../global-components/DashboardComponents/Charts/AssignmentCompletionPieChart";
import NavigationBar from "../../global-components/NavbarComponents/NavigationBar";
import Footer from "../../global-components/Footer";
import PastAssignmentCards from "../../global-components/DashboardComponents/PastAssignmentCards/PastAssignmentCards";
import CurrentAssignmentCard from "../../global-components/DashboardComponents/CurrentAssignmentCard";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import { getAssignmentsData, getStudents, getStudentCompletions } from "./dashboardFunctions";
import Spinner from "../../global-components/Spinner"
import { Backdrop } from "@mui/material";

//TODO: get all students and their respective completions, also get all assignments
//pass these in as props to the below grid children
//handle nulls in these children as well.

//useEffect if studentsArray === null we refetch. null can be passed back up from children if they invalidated the array.
// Creating an assignment invalidates the assignments, but this doesn't matter because we always trigger a fetch on the initial dashboard page render anyways.
export default function Dashboard() {
  const [assignmentID, setAssignmentID] = useState(null);

  const [assignmentsArray, setAssignmentsArray] = useState(null);
  const [studentsArray, setStudentsArray] = useState(null);
  const teacher = useSelector(selectTeacher);
  const classObject = useSelector(state => state.currentClass.selectedClass);

  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(() => {
    async function fetchDashboardData() {
      const start = performance.now(); // Starting performance timer
      console.log("fetching dashboard data . . .");

      const assignmentsArr = await getAssignmentsData(teacher.email, classObject.classCode);
      setAssignmentsArray(assignmentsArr);

      const studentsArr = await getStudents(classObject.classCode); //this array is incomplete as each object does not include the student's completions!

      const studentsArrPromises = studentsArr.map((studentDoc) => getStudentCompletions(studentDoc));
      const studentsArrWithCompletions = await Promise.all(studentsArrPromises);
      Promise.all(studentsArrWithCompletions);

      console.log("STUDENTS:", studentsArrWithCompletions);
      setStudentsArray(studentsArrWithCompletions);

      const elapsedTimeSeconds = (performance.now() - start) / 1000;
      console.log(`\n\t!!! fetchDashboardData done in ${elapsedTimeSeconds.toFixed(2)} seconds\n`);
    }

    fetchDashboardData();
  }, []); //purposeful empty dependency array to force a refetch on page reload

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

  useEffect(() => {
    if(studentsArray === null || assignmentsArray === null) {
      setSpinnerVisible(true);
    } else {
      setSpinnerVisible(false);
    }
  }, [studentsArray, assignmentsArray]);

//note: grid layout styling can be found in Dashboard.css
  return ( 
    <div className="mainContainer">
      <NavigationBar contentType="dashboard" />

      <div className="dashboardHeader">
        <h1>{classObject.className}</h1>
        <CurrentAssignmentCard
          email={teacher.email}
          classCode={classObject.classCode}
          assignmentID={assignmentID}
        />
      </div>

      <div className="dashboardGrid">
        <div className="childOne">
          <CompletionTimeLine />
        </div>
        <div className="childTwo">
          <AssignmentCompletionPieChart email={teacher.email} classCode={classObject.classCode} />
        </div>
        <div className="childThree">
          <StudentDataGrid studentsArray={studentsArray}/>
        </div>
        <div className="childFour">
          <PastAssignmentCards email={teacher.email} classCode={classObject.classCode} />
        </div>
      </div>

      <Footer />

      <Backdrop sx={{ color: 'var(--grey)', zIndex: 5 }} open={spinnerVisible}>
        <Spinner />
      </Backdrop>
    </div>
  );
}