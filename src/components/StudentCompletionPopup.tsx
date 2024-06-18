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
  if(rowData.dateCompleted.length === 0) {
    return <Typography variant="body1">No students have completed this activity yet.</Typography>
  }
  else{
    return rowData.dateCompleted.map((date, index) => (
      <Typography key={index} variant="body1">
        <strong>Name:</strong> {date.firstName} {date.lastName}{" "}
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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Student Completion Dates</DialogTitle>
      <DialogContent>
        {/* <Typography variant="body1">
          <strong>Chapter:</strong> {rowData.chapter}
        </Typography>
        <Typography variant="body1">
          <strong>Lesson:</strong> {rowData.lesson}
        </Typography>
        <Typography variant="body1">
          <strong>Activity:</strong> {rowData.activity}
        </Typography>
        <Typography variant="body1">
          <strong>Students Completed:</strong> {rowData.studentsCompleted}
        </Typography> */}
        {checkDateCompleted(rowData)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentCompletionPopup;
