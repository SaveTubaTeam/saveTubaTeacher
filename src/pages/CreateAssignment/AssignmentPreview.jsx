import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MemoryMinigameModal from './MemoryMinigameModal';
import SortingMinigameModal from './SortingMinigameModal';

const AssignmentPreview = ({ grade, chapter, lesson, onClose }) => {
  const [minigames, setMinigames] = useState([]);
  const [selectedMemoryMinigame, setSelectedMemoryMinigame] = useState(null);
  const [selectedSortingMinigame, setSelectedSortingMinigame] = useState(null);

  useEffect(() => {
    const fetchMinigames = async () => {
      try {
        const minigamesCollection = await db.collection(grade)
          .doc(chapter)
          .collection(lesson)
          .doc('en')
          .collection('masteryAndMinigames')
          .get();

        if (!minigamesCollection.empty) {
          const minigamesData = minigamesCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMinigames(minigamesData);
        } else {
          console.error('No minigames found!');
        }
      } catch (error) {
        console.error('Error fetching minigames:', error);
      }
    };

    fetchMinigames();
  }, [grade, chapter, lesson]);

  if (minigames.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Assignment Preview</Typography>
      <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
        {minigames.map(minigame => (
          <Card key={minigame.id} sx={{ width: 270, margin: '1rem' }}>
            <CardMedia
              sx={{ height: 200 }}
              image={minigame.iconDownloadURL || minigame.imageDownloadURL || 'default-image.png'}
              title={minigame.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {minigame.navigation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {minigame.title}
              </Typography>
              <Typography variant="body1">
                {minigame.prompt}
              </Typography>
              {minigame.navigation === 'Quiz' && minigame.content && minigame.content.map((question, index) => (
                <Box key={index} sx={{ marginTop: '1rem' }}>
                  <Typography variant="body1" component="p">{question.prompt}</Typography>
                  {question.answers && question.answers.map((answer, idx) => (
                    <Typography key={idx} variant="body2" component="p">
                      {answer}
                    </Typography>
                  ))}
                </Box>
              ))}
              {minigame.navigation === 'Memory' && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: '1rem' }}
                  onClick={() => setSelectedMemoryMinigame(minigame)}
                >
                  View
                </Button>
              )}
              {minigame.navigation === 'Sorting' && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: '1rem' }}
                  onClick={() => setSelectedSortingMinigame(minigame)}
                >
                  View
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      {selectedMemoryMinigame && (
        <MemoryMinigameModal
          open={Boolean(selectedMemoryMinigame)}
          onClose={() => setSelectedMemoryMinigame(null)}
          minigame={selectedMemoryMinigame}
        />
      )}
      {selectedSortingMinigame && (
        <SortingMinigameModal
          open={Boolean(selectedSortingMinigame)}
          onClose={() => setSelectedSortingMinigame(null)}
          minigame={selectedSortingMinigame}
        />
      )}
    </Box>
  );
};

export default AssignmentPreview;
