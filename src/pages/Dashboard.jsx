import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DataGrid from "../components/DashboardComponents/DataTableComponents/Datagrid";
import ChapterSelect from "../components/DashboardComponents/DataTableComponents/ChapterSelect";
import LessonSelect from "../components/DashboardComponents/DataTableComponents/LessonSelect";
import ActivitySelect from "../components/SelectComponents/ActivitySelect";
import "../App.css";
import DateSlider from "../components/DateSlider";
import CompletionTimeLine from "../components/Charts/CompletionTimeLine";
import ActivityCompletionBar from "../components/Charts/ActivityCompletionBar";
import AssignmentCompletionPieChart from "../components/Charts/AssignmentCompletionPieChart";
import TimeButtonGroup from "../components/TimeButtonGroup";
import NavigationBar from "../components/NavbarComponents/NavigationBar";
import ResetGridButton from "../components/DashboardComponents/ResetGridButton";
import ViewStudentPopup from "../components/DashboardComponents/ViewStudentComponents/ViewStudentsPopup";
import Button from "@mui/material/Button";

function Dashboard() {
  const email = "testteacher1@gmail.com";
  const classCode = "000000";
  const grade = "Grade2";
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [highlightedButton, setHighlightedButton] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <div className="grid-container">
        <NavigationBar />
        <div className="adjustclass">
          <div className="dayrange">
            <DateSlider />
          </div>
          <div id="button22">
            <TimeButtonGroup />
          </div>
        </div>
        <div className="additional-charts">
          <CompletionTimeLine />
          <AssignmentCompletionPieChart email={email} classCode={classCode} />
        </div>
        <div className="completionTime">
          <div className="completionTime2">
            <div className="Buttonsss">
              <div className="select-container">
                <ChapterSelect
                  grade={grade}
                  onChange={(chapter) => setSelectedChapter(chapter)}
                />
              </div>
              <div className="select-container">
                <LessonSelect
                  grade={grade}
                  chapter={selectedChapter}
                  onChange={(lesson) => setSelectedLesson(lesson)}
                />
              </div>
              <div className="select-container">
                <ActivitySelect
                  grade={grade}
                  chapter={selectedChapter}
                  lesson={selectedLesson}
                  onChange={(activity) => setSelectedActivity(activity)}
                />
              </div>
            </div>
            <div className="table-container">
              <DataGrid
                grade={grade}
                chapter={selectedChapter}
                lesson={selectedLesson}
                activity={selectedActivity}
                email={email}
                classCode={classCode}
              />
            </div>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleOpenPopup}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View Students
              </Button> */}
            <div className="se">
            <ResetGridButton />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenPopup}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View Students
              </Button>
              <ViewStudentPopup
              open={popupOpen}
              onClose={handleClosePopup}
              classCode={classCode}
            />
            </div>
          </div>
          <div className="chart-full">
            <ActivityCompletionBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;