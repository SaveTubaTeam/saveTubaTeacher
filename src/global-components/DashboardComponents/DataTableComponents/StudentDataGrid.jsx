import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  getStudents,
  getAssignmentsData,
  getAssignmentData,
} from "../../../data/dataFunctions";
import StudentCompletionPopup from "./StudentCompletionPopup";
import { Container } from "@mui/material";
import { db } from "../../../../firebase";

export default function StudentDataGrid({ email, classCode }) {
  const [rows, setRows] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [assignmentID, setAssignmentID] = useState(null);

  const handleOpenPopup = (rowData) => {
    setSelectedRow(rowData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 110,
      editable: false,
    },
    { field: "lastName", headerName: "Last Name", width: 110, editable: false },
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
      width: 145,
      renderCell: (params) => (
        <Container>
          <Button
            variant="contained"
            color="success"
            sx={{
              fontFamily: "Montserrat, sans-serif",
            }}
            onClick={() => handleOpenPopup(params.row)}
          >
            View
          </Button>
        </Container>
      ),
    },
  ];

  const fetchData = async (email, classCode, assignmentID) => {
    if (!email || !classCode) return;

    try {
      const students = await getStudents(classCode);

      let totalAssignments = [];
      let totalNumAssignments = 0;

      if (!assignmentID) {
        const assignments = await getAssignmentsData(email, classCode);
        totalAssignments = assignments.map((assignment) => ({
          assignmentID: assignment.assignmentID,
          assignmentSize: assignment.numActivities,
        }));
        totalNumAssignments = totalAssignments.reduce(
          (acc, assignment) => acc + assignment.assignmentSize,
          0
        );
      } else {
        let grade = "Grade" + assignmentID.substring(1, 2);
        let chapter = "Chapter" + assignmentID.substring(3, 4);
        let lesson = "Lesson" + assignmentID.substring(5, 6);

        const assignment = await getAssignmentData(
          grade,
          chapter,
          lesson,
          email,
          classCode
        );
        totalAssignments.push(assignment);
        totalNumAssignments = assignment.numActivities;
      }

      const studentCompletions = await Promise.all(
        students.map(async (student) => {
          let totalCompletions = 0;
          const completionsRef = db
            .collection("users")
            .doc(student.email)
            .collection("Completions");
          const snapshot = await completionsRef.get();
          const completionsData = snapshot.docs.map((doc) => doc.data());
          for (const completion of completionsData) {
            if (completion.completionID) {
              const [directory] = completion.completionID.split("_");
              if (
                totalAssignments.some(
                  (assignment) => assignment.assignmentID === directory
                )
              ) {
                totalCompletions += 1;
              }
            }
          }
          return {
            ...student,
            completionsCount: totalCompletions + "/" + totalNumAssignments +  ", " + Math.round(totalCompletions / totalNumAssignments * 100) + "%",
            dateCompleted: completionsData.map((completion) => ({
              ...completion,
            })),
          };
        })
      );

      const rowsData = studentCompletions.map((student, index) => ({
        id: index,
        firstName: student.firstName,
        lastName: student.lastName,
        studentsCompleted: student.completionsCount,
        dateCompleted: student.dateCompleted,
      }));

      setRows(rowsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    fetchData(email, classCode, assignmentID);
  }, [email, classCode, assignmentID]);

  return (
    <Box sx={{ height: 400, width: "100%", backgroundColor: "#ffffff" }}>
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
