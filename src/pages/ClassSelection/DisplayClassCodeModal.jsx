import React from 'react'
import Dialog from '@mui/material/Dialog';
import "./DisplayClassCodeModal.css"
import { RiCloseFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';

function DisplayCode({ displayCodeVisible, setDisplayCodeVisible, classItem }) {
   const teacher = useSelector(selectTeacher);

   return (
      <Dialog 
         fullWidth={true} 
         /* see: https://mui.com/material-ui/react-dialog/#optional-sizes */
         maxWidth="lg"
         open={displayCodeVisible}
         onClose={() => setDisplayCodeVisible(false)}
      > 
         <div className='classCodeDisplay'>
            <h1 >{classItem.classCode}</h1>
            <div className='textUnderClassCode'>
               <span>{teacher.lastName} - {classItem.className}</span>
            </div>

            <div id='exitIcon' onClick={() => setDisplayCodeVisible(false)}>
               <RiCloseFill size={'100px'}/>
            </div>
         </div>
      </Dialog>
   )
}

export default DisplayCode;