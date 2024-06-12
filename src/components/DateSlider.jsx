import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const marks = [
  { value: 0 },
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 },
  { value: 35 },
  { value: 40 },
  { value: 45 },
  { value: 50 },
  { value: 55 },
  { value: 60 },
  { value: 65 },
  { value: 70 },
  { value: 75 },
  { value: 100 },
];

const labels = {
  0: "Today",
  5: "Yesterday",
  10: "2 Days Ago",
  15: "3 Days Ago",
  20: "4 Days Ago",
  25: "5 Days Ago",
  30: "6 Days Ago",
  35: "7 Days Ago",
  40: "8 Days Ago",
  45: "9 Days Ago",
  50: "10 Days Ago",
  55: "11 Days Ago",
  60: "12 Days Ago",
  65: "13 Days Ago",
  70: "14 Days Ago",
  75: "A Month Ago",
  100: "Year Ago",
};

function getLabelForValue(value) {
  return labels[value] || value;
}

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column-reverse",
        color: "#CCE882",
      }}
    >
      {children}
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: "#CCE882",
        }}
        color="textSecondary"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Completed: {getLabelForValue(value)}
      </Typography>
    </Box>
  );
}

export default function DateSlider() {
  return (
    <Container>
      <Box sx={{ width: 500, marginTop: 4 }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={0}
          getAriaValueText={getLabelForValue}
          step={null}
          valueLabelDisplay="on"
          marks={marks}
          components={{ ValueLabel: ValueLabelComponent }}
          sx={{
            '& .MuiSlider-thumb': {
              color: '#CCE882', // Changes the thumb color to green
            },
            '& .MuiSlider-track': {
              color: '#CCE882', // Changes the track color to green
            },
            '& .MuiSlider-rail': {
              color: '#ddd', // Optional: change the rail color if needed
            },
          }}
        />
      </Box>
    </Container>
  );
}
