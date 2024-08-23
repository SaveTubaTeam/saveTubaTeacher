import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTeacher } from "../../../redux/teacherSlice";
import "./Dashboard.css"
import TimelineContainer from "./CompletionTimeline/TimelineContainer";
import PieChartContainer from "./CompletionPieChart/PieChartContainer";
import HeaderDashboard from "./HeaderDashboard";
import NavigationBar from "../../global-components/NavbarComponents/NavigationBar";
import Footer from "../../global-components/Footer";
import AssignmentCards from "./AssignmentCards/AssignmentCards";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import { getAssignments, getAssignmentLessonData, getStudents, getStudentCompletions } from "./dashboardFunctions";
import Spinner from "../../global-components/Spinner"
import { Backdrop } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

//pass assignments and students in as props to the below grid children
//handle nulls in these children as well.

//for student removal in StudentDataGrid: useEffect if studentsArray === null we refetch. null can be passed back up from children if they invalidated the array.
//we should first warn with a modal. Then we can just trigger a page refresh - that would be easiest.
// Creating an assignment invalidates the assignments, but this doesn't matter because we always trigger a fetch on the initial dashboard page render anyways.
export default function Dashboard() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [assignmentID, setAssignmentID] = useState(null);
  const { classCode: urlClassCode } = useParams();

  const [assignmentsArray, setAssignmentsArray] = useState(null);
  const [studentsArray, setStudentsArray] = useState(null);
  const teacher = useSelector(selectTeacher);
  const classObject = useSelector(state => state.currentClass.selectedClass);

  const [spinnerVisible, setSpinnerVisible] = useState(false);

  // @jac927 08/20/24 | Please note that we have not implemented router parameters correctly.
  // This means that manual entry of class codes into the url exhibits odd behaviour (partly due to the behaviour of redux-remember).
  // The team has deemed this a non-critical issue as we don't forsee teachers (or anyone, for that matter) manually entering urls

  useEffect(() => { //checking against mismatch between manually entered URL and "stale" redux-remember store
    if(urlClassCode !== classObject.classCode) {
      console.error("INVALID URL ENTERED! redirecting to class-selection...");
      navigate("/class-selection");
    }
  }, [urlClassCode]);

  useEffect(() => {
    async function fetchDashboardData() {
      const start = performance.now(); // Starting performance timer
      console.log("fetching dashboard data . . .");
      setSpinnerVisible(true);

      const assignmentsArr = await getAssignments(teacher.email, classObject.classCode);
      //loading promises onto an array to be resolved all at once!
      const assignmentsArrPromises = assignmentsArr.map((assignmentDoc) => getAssignmentLessonData(assignmentDoc, i18n.language)); //note the lack of await here!
      const assignmentsArrWithLessonData = await Promise.all(assignmentsArrPromises);

      console.log("ASSIGNMENTS:", assignmentsArrWithLessonData)
      setAssignmentsArray(assignmentsArrWithLessonData);

      const studentsArr = await getStudents(classObject.classCode); //this array is incomplete as each object does not include the student's completions!
      //loading promises onto an array to be resolved all at once!
      const studentsArrPromises = studentsArr.map((studentDoc) => getStudentCompletions(studentDoc)); //note the lack of await here!
      const studentsArrWithCompletions = await Promise.all(studentsArrPromises);

      console.log("STUDENTS:", studentsArrWithCompletions);
      setStudentsArray(studentsArrWithCompletions);

      const elapsedTimeSeconds = (performance.now() - start) / 1000;
      console.log(`\n\t!!! fetchDashboardData done in ${elapsedTimeSeconds.toFixed(2)} seconds\n`);
      setSpinnerVisible(false);
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

//note: grid layout styling can be found in Dashboard.css
  return ( 
    <div className="mainContainer">
      <NavigationBar contentType="dashboard" />

      <div className="dashboardGrid">
        <div className="dashboardHeader">
          <HeaderDashboard />
        </div>

        <div className="lineGraph">
          <TimelineContainer studentsArray={studentsArray} />
        </div>
        <div className="pieChart">
          <PieChartContainer studentsArray={studentsArray}/>
        </div>
        <div className="studentDataGrid">
          <StudentDataGrid studentsArray={studentsArray} />
        </div>
        <div className="assignmentCards">
          <AssignmentCards assignmentsArray={assignmentsArray} />
        </div>
      </div>

      <Footer />

      <Backdrop sx={{ color: 'var(--grey)', zIndex: 5 }} open={spinnerVisible}>
        <Spinner />
      </Backdrop>
    </div>
  );
}