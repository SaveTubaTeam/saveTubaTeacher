import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getGradeData, getLessonsData } from '../data/dataFunctions';

const columns = [
  { field: 'chapter', 
    headerName: 'Chapter', 
    type: 'number', 
    width: 90 },
  {
    field: 'lesson',
    headerName: 'Lesson',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'activity',
    headerName: 'Activity',
    width: 150,
    editable: false,
  },
  {
    field: 'studentsCompleted',
    headerName: 'Number of Students Completed',
    width: 250,
    editable: false,
  },
  {
    field: 'dateCompleted',
    headerName: 'Date Completed',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

export default function TableExample() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const grade = 'Grade5'; // Example grade, change as needed
      const languageCode = 'en'; // Example language code, change as needed

      try {
        console.log('Fetching grade data...');
        const chapters = await getGradeData(grade);
        console.log('Chapters fetched:', chapters);

        const lessonsPromises = chapters.map(async (chapter, chapterIndex) => {
          console.log(`Fetching lessons for chapter ${chapter.navigation}...`);
          const lessons = await getLessonsData(grade, chapter.navigation, languageCode);
          console.log(`Lessons for chapter ${chapter.navigation} fetched:`, lessons);
          return lessons.flatMap((lesson, lessonIndex) =>
            lesson.masteryAndMinigames.map((activity, activityIndex) => ({
              id: `${chapterIndex + 1}-${lessonIndex + 1}-${activityIndex + 1}-${activity.navigation}`, // Unique ID
              chapter: chapterIndex + 1,
              lesson: lessonIndex + 1,
              activity: activity.navigation,
              studentsCompleted: 0, 
              dateCompleted: '',
            }))
          );
        });

        const lessonsArray = await Promise.all(lessonsPromises);
        const flattenedActivities = lessonsArray.flat();
        console.log('Flattened activities:', flattenedActivities);

        setRows(flattenedActivities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
