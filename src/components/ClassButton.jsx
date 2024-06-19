import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const HighlightedButton = styled(Button)(({ theme, isHighlighted }) => ({
  backgroundColor: isHighlighted ? theme.palette.success.light : theme.palette.success.main,
  '&:hover': {
    backgroundColor: isHighlighted ? theme.palette.success.light : theme.palette.success.dark,
  },
}));

export default function ClassButton({ title, isHighlighted, onClick }) {
  return (
    <HighlightedButton
      variant="contained"
      onClick={onClick}
      isHighlighted={isHighlighted}
    >
      {title}
    </HighlightedButton>
  );
}
