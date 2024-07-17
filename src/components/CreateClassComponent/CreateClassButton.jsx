import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CreateClassPopup from './CreateClassPopup';
import { CiCirclePlus } from 'react-icons/ci';

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
      <CiCirclePlus size="40px" color="Green"  onClick={handleOpen}>
      </CiCirclePlus>
      <CreateClassPopup open={open} onClose={handleClose} email={email}/>
    </div>
  );
};

export default CreateClassButton;
