import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTeacher } from "../../redux/teacherSlice";
import ChapterSelect from "../components/DashboardComponents/DataTableComponents/ChapterSelect";
import LessonSelect from "../components/DashboardComponents/DataTableComponents/LessonSelect";
import ActivitySelect from "../components/DashboardComponents/DataTableComponents/ActivitySelect";
import "./Dashboard.css"
import DateSlider from "../components/DateSlider";
import CompletionTimeLine from "../components/DashboardComponents/Charts/CompletionTimeLine";
import ActivityCompletionBar from "../components/DashboardComponents/Charts/ActivityCompletionBar";
import AssignmentCompletionPieChart from "../components/DashboardComponents/Charts/AssignmentCompletionPieChart";
import TimeButtonGroup from "../components/TimeButtonGroup";
import NavigationBar from "../components/NavbarComponents/NavigationBar";
import Footer from "../components/Footer";
import ResetGridButton from "../components/DashboardComponents/ResetGridButton";
import ViewStudentPopup from "../components/DashboardComponents/ViewStudentComponents/ViewStudentsPopup";
import StudentDataGrid from "../components/DashboardComponents/DataTableComponents/StudentDataGrid";
import PastAssignmentCards from "../components/DashboardComponents/PastAssignmentCards/PastAssignmentCards";
import CurrentAssignmentCard from "../components/DashboardComponents/CurrentAssignmentCard";

function Dashboard() {
  const { classCode: urlClassCode } = useParams(); // Extract class code from URL
  const [assignmentID, setAssignmentID] = useState(null);
  const teacher = useSelector(selectTeacher);
  const classItem = useSelector(state => state.teacher.selectedClass);
  const email = teacher.email;

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
      <NavigationBar />

      <div className="dashboardHeader">
        <h1>{classItem.className}</h1>
        <CurrentAssignmentCard
          email={email}
          classCode={urlClassCode}
          assignmentID={assignmentID}
        />
      </div>

      <div className="dashboardGrid">
        <div className="childOne">
          <CompletionTimeLine />
        </div>
        <div className="childTwo">
          <AssignmentCompletionPieChart email={email} classCode={urlClassCode} />
        </div>
        <div className="childThree">
          <StudentDataGrid
            email={email}
            classCode={urlClassCode}
            assignmentID={assignmentID}
          />
        </div>
        <div className="childFour">
          <PastAssignmentCards email={email} classCode={urlClassCode} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;


// <div className="grid-container">
//         <NavigationBar email={email} classCode={classCode} assignmentID={assignmentID}/>
//         <div className="adjustclass">
//           {/* <div className="dayrange">
//             <DateSlider />
//           </div> */}
//           {/* <div id="button22">
//             <TimeButtonGroup />
//           </div> */}
//         </div>
//         <div className="additional-charts">
//           {/* <CompletionTimeLine />
//           <AssignmentCompletionPieChart email={email} classCode={classCode} /> */}
//         </div>
//         <div className="completionTime">
//           <div className="completionTime2">
//             <div className="Buttonsss">
//               {/* <div className="select-container">
//                 <ChapterSelect
//                   grade={grade}
//                   onChange={(chapter) => setSelectedChapter(chapter)}
//                 />
//               </div>
//               <div className="select-container">
//                 <LessonSelect
//                   grade={grade}
//                   chapter={selectedChapter}
//                   onChange={(lesson) => setSelectedLesson(lesson)}
//                 />
//               </div>
//               <div className="select-container">
//                 <ActivitySelect
//                   grade={grade}
//                   chapter={selectedChapter}
//                   lesson={selectedLesson}
//                   onChange={(activity) => setSelectedActivity(activity)}
//                 />
//               </div> */}
//             </div>
//             <div className="table-container">
//               <StudentDataGrid
//                 email={email}
//                 classCode={classCode}
//                 assignmentID={assignmentID}
//               />
//             </div>
//             <div className="se">
//               <ResetGridButton />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleOpenPopup}
//                 sx={{ fontFamily: "Montserrat, sans-serif" }}
//               >
//                 View Students
//               </Button>
//               <ViewStudentPopup
//                 open={popupOpen}
//                 onClose={handleClosePopup}
//                 classCode={classCode}
//               />
//             </div>
//           </div>
//           <div className="chart-full">
//             {/* <ActivityCompletionBar /> */}
//           </div>
//           <PastAssignmentCards email={email} classCode={classCode} />
//         </div>
//       </div>
//     </>