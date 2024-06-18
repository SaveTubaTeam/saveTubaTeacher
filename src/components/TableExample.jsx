import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  getLessonsData,
  getCompletedPerAssignment,
  getStudents,
} from "../data/dataFunctions";
import StudentCompletionPopup from "../components/StudentCompletionPopup";
import { Container } from "@mui/material";

const language = "en";

export default function TableExample({
  grade,
  chapter,
  lesson,
  activity,
  email,
  classCode,
}) {
  const [rows, setRows] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenPopup = (rowData) => {
    setSelectedRow(rowData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    { field: "chapter", headerName: "Chapter", width: 90 },
    { field: "lesson", headerName: "Lesson", width: 90, editable: false },
    { field: "activity", headerName: "Activity", width: 150, editable: false },
    {
      field: "studentsCompleted",
      headerName: "Number of Students Completed",
      width: 250,
      editable: false,
    },
    {
      field: "dateCompleted",
      headerName: "Date Completed",
      description: "Time and date the activity was completed",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenPopup(params.row)}
          >
            View
          </Button>
        </Container>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!chapter || !email || !classCode) return;

      try {
        const lessons = await getLessonsData(grade, chapter, language);

        const chapterNumber = parseInt(chapter.replace(/\D/g, ""), 10) || 0;

        const filteredLessons = await Promise.all(
          lessons
            .filter((l) => !lesson || l.navigation === lesson)
            .flatMap((l) => {
              const lessonNumber =
                parseInt(l.title.replace(/\D/g, ""), 10) || 0;
              const lessonPath =
                "G" +
                grade.substring(5) +
                "C" +
                chapterNumber +
                "L" +
                lessonNumber;
              return l.masteryAndMinigames.map(async (activity) => {
                const activityId = `${lessonPath}_${activity.navigation}`;
                const completedAssignmentsArray =
                  await getCompletedPerAssignment(activityId, classCode);

                let students = await getStudents(classCode);
                let total = students.length;
                let completedCount =
                  completedAssignmentsArray.length + "/" + total;

                let dateCompleted = completedAssignmentsArray.map(
                  (completion) => {
                    // const student = students.find(
                    //   (student) => student.email === completion.email
                    // );
                    return {
                      firstName: completion.firstName,
                      lastName: completion.lastName,
                      dateCompleted: completion.submissionTime,
                    };
                  }
                );

                return {
                  id: activityId,
                  chapter: chapterNumber,
                  lesson: lessonNumber,
                  activity: activity.navigation,
                  studentsCompleted: completedCount,
                  dateCompleted: dateCompleted,
                };
              });
            })
        );

        const activitiesFiltered = (await Promise.all(filteredLessons)).filter(
          (a) => !activity || a.activity === activity
        );

        setRows(activitiesFiltered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chapter, lesson, activity, email, classCode]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          fontFamily: "Montserrat, sans-serif",
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {selectedRow && (
        <StudentCompletionPopup
          open={popupOpen}
          onClose={handleClosePopup}
          rowData={selectedRow}
        />
      )}
    </Box>
  );
}
