import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

interface StudentCompletionPopupProps {
  open: boolean;
  onClose: () => void;
  rowData: {
    chapter: number;
    lesson: number;
    activity: string;
    studentsCompleted: string;
    dateCompleted: {
      firstName: string;
      lastName: string;
      dateCompleted: string;
    }[];
  };
}

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

function checkDateCompleted(rowData: StudentCompletionPopupProps["rowData"]) {
  if (rowData.dateCompleted.length === 0) {
    return (
      <StyledTypography variant="body1">
        No students have completed this activity yet.
      </StyledTypography>
    );
  } else {
    return rowData.dateCompleted.map((date, index) => (
      <StyledTypography key={index} variant="body1">
        <strong>Name:</strong> {date.firstName} {date.lastName}
        <span> </span>
        <strong>Date Completed:</strong> {date.dateCompleted}
      </StyledTypography>
    ));
  }
}

const StudentCompletionPopup: React.FC<StudentCompletionPopupProps> = ({
  open,
  onClose,
  rowData,
}) => { 
  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle><strong>Student Completion Dates</strong></StyledDialogTitle>
      <StyledDialogContent>{checkDateCompleted(rowData)}</StyledDialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} color="success">
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default StudentCompletionPopup;
