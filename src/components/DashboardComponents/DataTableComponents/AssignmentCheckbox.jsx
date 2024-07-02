import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AssignmentCheckbox() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox defaultChecked color="success" />}
        label="Assignment"
        sx={{
          "& .MuiTypography-root": {
            fontFamily: "Montserrat, sans-serif",
          },
        }}
      />
    </FormGroup>
  );
}
