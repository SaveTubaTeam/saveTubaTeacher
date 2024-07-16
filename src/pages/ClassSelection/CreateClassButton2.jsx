import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CreateClassPopup from '../../components/CreateClassComponent/CreateClassPopup';

const CreateClassButton = ({ email }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="class-card add-class-card">
      <Button onClick={handleOpen}>
        + Add a new class
      </Button>
      <CreateClassPopup open={open} onClose={handleClose} email={email}/>
    </div>
  );
};

export default CreateClassButton;
