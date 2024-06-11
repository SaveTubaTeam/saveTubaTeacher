import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getLessonsData } from '../data/dataFunctions';

export default function ActivitySelect({ chapter, lesson, onChange }) {
  const grade = 'Grade5'; // Static grade value
  const languageCode = 'en'; // Static language code
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]); // State to store the activities

  const handleChange = (event) => {
    const selectedActivity = event.target.value;
    setActivity(selectedActivity);
    onChange(selectedActivity);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!chapter || !lesson) return;

      try {
        const lessons = await getLessonsData(grade, chapter, languageCode);
        const selectedLesson = lessons.find((l) => l.navigation === lesson);
        if (selectedLesson) {
          const activities = selectedLesson.masteryAndMinigames.map((activity) => ({
            ...activity,
            lessonTitle: selectedLesson.title, // Optionally include the lesson title
          }));
          setActivities(activities);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [chapter, lesson, languageCode]);

  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="activity-select-label">Activity</InputLabel>
        <Select
          labelId="activity-select-label"
          id="activity-select"
          value={activity}
          label="Activity"
          onChange={handleChange}
        >
          {activities.map((activity, index) => (
            <MenuItem key={index} value={activity.navigation}>
              {activity.navigation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
