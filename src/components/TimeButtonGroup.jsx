import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Updated theme to include Montserrat font
const theme = createTheme({
  palette: {
    primary: {
      main: '#cce882',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export default function TimeButtonGroup() {
  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup variant="contained" aria-label="Time Button Group">
        <Button>Today</Button>
        <Button>Yesterday</Button>
        <Button>7 Days</Button>
        <Button>14 Days</Button>
        <Button>Month</Button>
        <Button>All Time</Button>
      </ButtonGroup>
    </ThemeProvider>
  );
}
