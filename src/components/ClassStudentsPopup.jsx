// ClassStudentsPopup.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

const StyledTypography = styled(Typography)({
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "8px",
});

const ClassStudentsPopup = ({ open, onClose, students }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><strong>Students</strong></DialogTitle>
      <DialogContent>
        <ol>
          {students.map((student, index) => (
            <li key={index}>
              <StyledTypography key={index} variant="body1">
                <strong>Name: </strong>{student.firstName} {student.lastName} <strong>Email: </strong>{student.email}
              </StyledTypography>
            </li>
          ))}
        </ol>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassStudentsPopup;
