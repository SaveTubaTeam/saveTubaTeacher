import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

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

function checkDateCompleted(rowData: StudentCompletionPopupProps["rowData"]) {
  if (rowData.dateCompleted.length === 0) {
    return (
      <Typography variant="body1">
        No students have completed this activity yet.
      </Typography>
    );
  } else {
    return rowData.dateCompleted.map((date, index) => (
      <Typography key={index} variant="body1">
        <strong>Name:</strong> {date.firstName} {date.lastName}
        <span> </span>
        <strong>Date Completed:</strong> {date.dateCompleted}
      </Typography>
    ));
  }
}

const StudentCompletionPopup: React.FC<StudentCompletionPopupProps> = ({
  open,
  onClose,
  rowData,
}) => {
  const popupStyle = {
    fontFamily: "Montserrat, sans-serif",
  };

  return (
    <Dialog open={open} onClose={onClose} style={popupStyle}>
      <DialogTitle>Student Completion Dates</DialogTitle>
      <DialogContent>{checkDateCompleted(rowData)}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentCompletionPopup;
