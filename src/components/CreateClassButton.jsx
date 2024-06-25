import * as React from 'react';
import Button from '@mui/material/Button';


export default function CreateClassButton(props) {
  return (
      <Button variant="contained" color="info">
        {props.title}
      </Button>
  );
}