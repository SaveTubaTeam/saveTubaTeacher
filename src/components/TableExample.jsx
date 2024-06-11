import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getLessonsData } from '../data/dataFunctions';

const columns = [
  { field: 'chapter', headerName: 'Chapter', width: 90 },
  { field: 'lesson', headerName: 'Lesson', width: 90, editable: false },
  { field: 'activity', headerName: 'Activity', width: 150, editable: false },
  { field: 'studentsCompleted', headerName: 'Number of Students Completed', width: 250, editable: false },
  { field: 'dateCompleted', headerName: 'Date Completed', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160 },
];

export default function TableExample({ chapter, lesson, activity }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!chapter) return;

      try {
        const lessons = await getLessonsData('Grade5', chapter, 'en');
        
        const chapterNumber = parseInt(chapter.replace(/\D/g, ''), 10) || 0; // Extract chapter number

        const filteredLessons = lessons
          .filter(l => !lesson || l.navigation === lesson)
          .flatMap(l => {
            const lessonNumber = parseInt(l.title.replace(/\D/g, ''), 10) || 0; // Extract lesson number
            return l.masteryAndMinigames.map((activity, index) => ({
              id: `${l.navigation}-${activity.navigation}`,
              chapter: chapterNumber,
              lesson: lessonNumber,
              activity: activity.navigation,
              studentsCompleted: 0, // Replace with actual data if available
              dateCompleted: '', // Replace with actual data if available
            }));
          })
          .filter(a => !activity || a.activity === activity);

        setRows(filteredLessons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [chapter, lesson, activity]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
