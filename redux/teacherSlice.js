import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   teacher: {},
   assignments: []
}

//slice boilerplate re: https://redux-toolkit.js.org/tutorials/quick-start
const teacherSlice = createSlice({
   name: 'teacher',
   initialState: initialState,
   reducers: {
      signInTeacher(state, action) {
         const { data } = action.payload;
         state.teacher = data;
         console.log("dispatched signInTeacher | USER:", data);
      },
      signOutTeacher(state, action) {
         console.log("signOutTeacher successfully dispatched to userSlice!")
         return initialState; //reset state
      }
   }
});

export const { signInTeacher, signOutTeacher } = teacherSlice.actions;
export default teacherSlice.reducer //exports all reducers