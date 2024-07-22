import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CircularProgress } from '@mui/material';
import { getStudents } from "../data/dataFunctions"

export default function ViewStudentsDialog({ viewStudentsDialog, setViewStudentsDialog, classCode }) {
   const [students, setStudents] = useState(null);

   useEffect(() => {
      async function handleViewStudents(classCode) {
         if(viewStudentsDialog && classCode) {
            const studentData = await getStudents(classCode);
            setStudents(studentData);
         }
      };

      handleViewStudents(classCode);
   }, [viewStudentsDialog]);

   let content = ( //while we load students (students is null), render a spinner
      <div style={{ display: 'flex', justifyContent: 'center' }}>
         <CircularProgress sx={{ color: 'var(--primary)', marginTop: '30px' }}/>
      </div>
   );
   if(students !== null) { 
      content = (
         students.map((student, index) => (
            <h4 key={index}>
               <strong>Name: </strong>{student.firstName} {student.lastName} <br/> <strong>Email: </strong>{student.email}
            </h4>
         ))
      )
   }

   return (
      <Dialog open={viewStudentsDialog}>
         <DialogTitle sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '2rem', background: 'var(--primary)', color: 'var(--light)' }}>
            Students
         </DialogTitle>
         <DialogContent sx={{ background: 'var(--light)' }}>
            {content}
         </DialogContent>
         <DialogActions sx={{ background: 'var(--light)' }}>
            <button onClick={() => setViewStudentsDialog(false)}>Close</button>
         </DialogActions>
      </Dialog>
   );
}