import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { getClassroomStudents } from "../../../data/dataFunctions";

const StyledDialogTitle = styled(DialogTitle)({
  fontFamily: "Montserrat, sans-serif",
});

const StyledDialogContent = styled(DialogContent)({
  fontFamily: "Montserrat, sans-serif",
});

const StyledTypography = styled(Typography)({
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "8px",
});

const StyledButton = styled(Button)({
  fontFamily: "Montserrat, sans-serif",
});

const ViewStudentPopup = ({ open, onClose, classCode }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const classroomStudents = await getClassroomStudents(classCode);
      setStudents(classroomStudents);
    };

    if (open) {
      fetchStudents();
    }
  }, [classCode, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <strong>Students</strong>
      </StyledDialogTitle>
      <StyledDialogContent>
        {students.length > 0 ? (
          students.map((student, index) => (
            <StyledTypography key={index} variant="body1">
              {student.firstName} {student.lastName}
            </StyledTypography>
          ))
        ) : (
          <StyledTypography variant="body1">
            No students found.
          </StyledTypography>
        )}
      </StyledDialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} color="success">
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewStudentPopup;
