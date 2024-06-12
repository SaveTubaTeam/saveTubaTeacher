import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getGradeData, getLessonsData } from '../data/dataFunctions';

const columns = [
  { field: 'chapter', headerName: 'Chapter', width: 90 },
  { field: 'lesson', headerName: 'Lesson', width: 90, editable: false },
  { field: 'activity', headerName: 'Activity', width: 120, editable: false },
  { field: 'studentsCompleted', headerName: 'Number of Students Completed', width: 250, editable: false },
  { field: 'dateCompleted', headerName: 'Date Completed', description: 'This column has a value getter and is not sortable.', sortable: false, width: 120 },
];

export default function TableExample({ chapter, lesson, activity }) {
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grade = 'Grade5';
        const chapters = await getGradeData(grade);
        let allLessons = [];

        for (const chap of chapters) {
          const lessons = await getLessonsData(grade, chap.navigation, 'en');
          allLessons.push(...lessons);
        }

        const allData = allLessons.flatMap((lesson, lessonIndex) => {
          const lessonNumber = parseInt(lesson.title.replace(/\D/g, ''), 10) || lessonIndex + 1;
          return lesson.masteryAndMinigames.map((activity, activityIndex) => ({
            id: `${lesson.navigation}-${activity.navigation}`,
            chapter: parseInt(lesson.navigation.replace(/\D/g, ''), 10) || lessonIndex + 1,
            lesson: lessonNumber,
            activity: activity.navigation,
            studentsCompleted: 0,
            dateCompleted: '',
          }));
        });

        setAllData(allData);
        setRows(allData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredRows = allData.filter(row =>
      (!chapter || row.chapter === parseInt(chapter.replace(/\D/g, ''), 10)) &&
      (!lesson || row.lesson === parseInt(lesson.replace(/\D/g, ''), 10)) &&
      (!activity || row.activity === activity)
    );

    setRows(filteredRows);
  }, [chapter, lesson, activity, allData]);

  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor:'#ffffff' }}>
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
