import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   teacher: {}, //teacher's json doc in firebase
   selectedClass: null, //the classItem object passed onClick from ClassCards.jsx
}

//slice boilerplate see: https://redux-toolkit.js.org/tutorials/quick-start
const teacherSlice = createSlice({
   name: 'teacher',
   initialState: initialState,
   reducers: {
      signInTeacher(state, action) {
         const { data } = action.payload;
         state.teacher = data;
         console.log("dispatched signInTeacher | TEACHER:", data);
      },
      signOutTeacher(state, action) {
         console.log("signOutTeacher has successfully reset teacherSlice!")
         return initialState; //reset state
      },
      selectClass(state, action) {
         const { selectedClass } = action.payload;
         state.selectedClass = selectedClass;
         console.log(`dispatched selectClass | SELECTEDCLASS:`, selectedClass);
      }
   }
});

export const { signInTeacher, signOutTeacher, selectClass } = teacherSlice.actions;
export default teacherSlice.reducer //exports all reducers

export const selectTeacher = state => state.teacher.teacher; //custom selector