import React from 'react';
import Dialog from '@mui/material/Dialog';
import { RiCloseFill } from "react-icons/ri";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


const MemoryMinigameModal = ({ open, onClose, minigame }) => {
  return (
    <Dialog 
      fullWidth={true} 
      maxWidth="lg"
      open={open}
      onClose={onClose}
    > 
      <Box sx={{ padding: '1rem' }}>
        <Typography variant="h4" gutterBottom>Memory Minigame</Typography>
        {minigame.content && minigame.content.map((item, index) => (
          <Box key={index} sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            {item.imageDownloadURL && (
              <CardMedia
                sx={{ height: 100, width: 100, marginRight: '1rem' }}
                image={item.imageDownloadURL}
                title={item.name}
              />
            )}
            <Typography variant="body1">{item.name}</Typography>
          </Box>
        ))}
        <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MemoryMinigameModal;
