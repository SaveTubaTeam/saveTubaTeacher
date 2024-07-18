import React, { useState } from 'react';
import CreateClassPopup from './CreateClassPopup';
import { Button } from '@mui/material';

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
      <Button onClick={handleOpen}>
        Create Class
      </Button>
      <CreateClassPopup open={open} onClose={handleClose} email={email}/>
    </div>
  );
};

export default CreateClassButton;
