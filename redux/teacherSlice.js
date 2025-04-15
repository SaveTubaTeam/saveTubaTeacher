import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   teacher: {}, //teacher's json doc in firebase
}

//slice boilerplate see: https://redux-toolkit.js.org/tutorials/quick-start
const teacherSlice = createSlice({
   name: 'teacher',
   initialState: initialState,
   reducers: {
      populateTeacherSlice(state, action) { //to sign in
         const { data } = action.payload;
         state.teacher = data; //set the data for the teacher's classrooms to the teacher
         // if (data.classes.length == 0 ){
         //    state.teacher.classes = ["No classrooms yet"];
         // }
         console.log("dispatched populateTeacherSlice | TEACHER:", data);
         console.log("state.teacher data:", state.teacher);
      },
      signOutTeacher(state, action) {
         console.log("signOutTeacher has successfully reset teacherSlice!")
         return initialState; //reset state
      },
   }
});

export const { populateTeacherSlice, signOutTeacher } = teacherSlice.actions;
export default teacherSlice.reducer //exports all reducers

export const selectTeacher = state => state.teacher.teacher; //custom selector