import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

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

function checkDateCompleted(dateCompleted) {
  if (!dateCompleted || dateCompleted.length === 0) {
    return (
      <StyledTypography variant="body1">
        No students have completed this activity yet.
      </StyledTypography>
    );
  } else {
    //const assignmentName = placeholder.replace(/_/g,' ');

    return dateCompleted.map((completion, index) => (
      <StyledTypography key={index} variant="body1">
        <strong>Assignment Name:</strong>{" "}
        {completion.completionID.replace(/_/g, " ")}
        <span> </span>
        <strong>Date Completed:</strong> {completion.submissionTime}
      </StyledTypography>
    ));
  }
}

const StudentCompletionPopup = ({ open, onClose, rowData }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <strong>Student Completion Dates</strong>
      </StyledDialogTitle>
      <StyledDialogContent>
        {checkDateCompleted(rowData.dateCompleted)}
      </StyledDialogContent>
      <DialogActions>
        <StyledButton
          onClick={onClose}
          variant="contained"
          color="success"
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default StudentCompletionPopup;
