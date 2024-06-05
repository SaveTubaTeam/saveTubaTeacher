import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'chapter', headerName: 'Chapter', type: 'number',
  width: 90 },
  {
    field: 'lesson',
    headerName: 'Lesson',
    type: 'number',
    width: 90,
    editable: true,
  },
  {
    field: 'activity',
    headerName: 'Activity',
    width: 150,
    editable: true,
  },
  {
    field: 'studentsCompleted',
    headerName: 'Number of Students Completed',
    width: 250,
    editable: true,
  },
  {
    field: 'dateCompleted',
    headerName: 'Date Completed',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, chapter: 1, activity: 'Hello', lesson: 1,studentsCompleted: 30 },
];

export default function TableExample() {
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