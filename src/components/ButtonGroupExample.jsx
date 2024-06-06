import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#cce882',
        },
      },
  });

export default function BasicButtonGroup() {
  return (
    <ButtonGroup  variant="contained" aria-label="Basic button group">
      <Button>Today</Button>
      <Button>Yesterday</Button>
      <Button>7 Days</Button>
      <Button>14 Days</Button>
      <Button>Month</Button>
      <Button>All Time</Button>
    </ButtonGroup>
  );
}