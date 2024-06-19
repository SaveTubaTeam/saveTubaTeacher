import * as React from 'react';
import Button from '@mui/material/Button';


export default function ClassButton(props) {
  return (
      <Button variant="contained" color="success">
        {props.title}
      </Button>
  );
}