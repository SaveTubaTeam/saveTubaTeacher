import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CreateClassPopup from './Popups/CreateClassPopup';

const CreateClassButton = ({ email }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        +
      </Button>
      <CreateClassPopup open={open} onClose={handleClose} email={email}/>
    </div>
  );
};

export default CreateClassButton;
