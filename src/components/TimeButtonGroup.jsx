import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group" sx={{height: '55px', width:'500px', backgroundColor:'#ffffff'}}>
      <Button sx={{ bgcolor: '#CCE882' }}>Today</Button>
      <Button sx={{ bgcolor: '#CCE882' }}>Yesterday</Button>
      <Button sx={{ bgcolor: '#CCE882' }}>7 Days</Button>
      <Button sx={{ bgcolor: '#CCE882' }}>14 Days</Button>
      <Button sx={{ bgcolor: '#CCE882' }}>Month</Button>
      <Button sx={{ bgcolor: '#CCE882' }}>All Time</Button>
    </ButtonGroup>
  );
}
