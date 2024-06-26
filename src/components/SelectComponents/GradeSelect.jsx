import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const gradeCollections = ["Grade2", "Grade3", "Grade4", "Grade5"];

const GradeSelect = ({ handleChange }) => {
  const [selectedGrade, setSelectedGrade] = useState("");

  const handleGradeChange = (event) => {
    const selectedGrade = event.target.value;
    setSelectedGrade(selectedGrade);
    handleChange(selectedGrade); // Pass the selected grade to the parent component
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="grade-select-label" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Grade
        </InputLabel>
        <Select
          sx={{ fontFamily: "Montserrat, sans-serif" }}
          labelId="grade-select-label"
          id="grade-select"
          value={selectedGrade}
          onChange={handleGradeChange}
          label="Grade"
        >
          <MenuItem value="" style={{ fontFamily: "Montserrat, sans-serif" }}>
            No Option
          </MenuItem>
          {gradeCollections.map((grade, index) => (
            <MenuItem key={index} value={grade} style={{ fontFamily: "Montserrat, sans-serif" }}>
              {grade}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GradeSelect;
