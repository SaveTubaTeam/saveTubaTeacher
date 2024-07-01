import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import GradeSelect from "../SelectComponents/GradeSelect";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import SubmitClassButton from "../SubmitClassButton";
import { db } from "../../../firebase";

async function fetchClassCodes() {
  const classList = await db.collection("classrooms").get();
  return classList.docs.map((doc) => doc.data().classCode);
}

function generateRandomCode(existingCodes) {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const codeLength = 6;
  let code = '';

  while (code.length < codeLength) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomIndex];

    if (
      code.length > 0 &&
      ((code[code.length - 1] === 'I' && randomChar === 'L') ||
        (code[code.length - 1] === 'L' && randomChar === 'I'))
    ) {
      continue; // Skip this character if I and L would be next to each other
    }

    code += randomChar;
  }

  if (existingCodes.includes(code)) {
    return generateRandomCode(existingCodes);
  }

  return code;
}

const StyledDialogTitle = styled(DialogTitle)({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: "bold",
});

const StyledDialogContent = styled(DialogContent)({
  fontFamily: "Montserrat, sans-serif",
  paddingBottom: '16px'
});

const StyledButton = styled(Button)({
  fontFamily: "Montserrat, sans-serif",
});

const CreateClassPopup = ({ open, onClose, email }) => {
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('');
  const [existingCodes, setExistingCodes] = useState([]);

  useEffect(() => {
    fetchClassCodes().then(setExistingCodes);
  }, []);

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleGradeChange = (selectedGrade) => { 
    setGrade(selectedGrade);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <strong>Create a Class</strong>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography variant="h6" style={{ fontFamily: "Montserrat, sans-serif", marginBottom: '8px' }}>
          Enter the Class Name
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mb: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Class name"
            variant="standard"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            value={className}
            onChange={handleClassNameChange}
          />
        </Box>
        <Typography variant="h6" style={{ fontFamily: "Montserrat, sans-serif", marginTop: '16px', marginBottom: '8px' }}>
          Select the Grade
        </Typography>
        <GradeSelect handleChange={handleGradeChange} />
      </StyledDialogContent>
      <DialogActions>
        <SubmitClassButton email={email} classCode={generateRandomCode(existingCodes)} className={className} gradeLevel={grade}/>
        <StyledButton onClick={onClose} color="success">
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClassPopup;
