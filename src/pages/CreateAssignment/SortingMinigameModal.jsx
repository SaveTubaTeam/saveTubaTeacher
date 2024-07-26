import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const SortingMinigameModal = ({ open, onClose, minigame }) => {
  return (
    <Dialog 
      fullWidth={true} 
      maxWidth="lg"
      open={open}
      onClose={onClose}
    > 
      <Box sx={{ padding: '1rem' }}>
        <Typography variant="h4" gutterBottom>{minigame.navigation || 'Sorting Minigame'}</Typography>
        <Typography variant="h6" gutterBottom>Categories</Typography>
        {minigame.categories && minigame.categories.map((category, index) => (
          <Box key={index} sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            {category.imageDownloadURL && (
              <CardMedia
                sx={{ height: 100, width: 100, marginRight: '1rem' }}
                image={category.imageDownloadURL}
                title={category.name}
              />
            )}
            <Typography variant="body1">{category.name}</Typography>
          </Box>
        ))}
        <Typography variant="h6" gutterBottom sx={{ marginTop: '2rem' }}>Options</Typography>
        {minigame.options && minigame.options.map((option, index) => (
          <Box key={index} sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{option.name} {option.title}</Typography>
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

export default SortingMinigameModal;
