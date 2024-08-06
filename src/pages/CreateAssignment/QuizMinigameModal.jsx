import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

const QuizMinigameModal = ({ open, onClose, minigame }) => {
  return (
    <Dialog 
      fullWidth={true} 
      maxWidth="lg"
      open={open}
      onClose={onClose}
    > 
      <Box sx={{ padding: '1rem' }}>
        <Typography variant="h4" gutterBottom>Quiz Minigame</Typography>
        {minigame.content && minigame.content.map((question, index) => (
          <Box key={index} sx={{ marginTop: '1rem' }}>
            <Typography variant="body1" component="p">{question.prompt}</Typography>
            {question.answers && question.answers.map((answer, idx) => (
              <Typography key={idx} variant="body2" component="p">
                {answer}
              </Typography>
            ))}
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

export default QuizMinigameModal;
