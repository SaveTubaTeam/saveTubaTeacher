import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const reloadWebsite = () => {
  window.location.reload();
};

export default function ResetGridButton() {
  return (
      <Button onClick={reloadWebsite} variant="contained" color="success">
        Reset
      </Button>
  );
}