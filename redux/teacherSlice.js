import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";

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
         console.log("dispatched signInTeacher | TEACHER:", data);
      },
      signOutTeacher(state, action) {
         console.log("signOutTeacher successfully dispatched to teacherSlice!")
         return initialState; //reset state
      }
   },
   //for purging redux-persist store: https://stackoverflow.com/questions/68929107/how-to-purge-any-persisted-state-using-react-tool-kit-with-redux-persist
   extraReducers: (builder) => {
      builder.addCase(PURGE, () => {
        return initialState;
      });
   },
});

export const { signInTeacher, signOutTeacher } = teacherSlice.actions;
export default teacherSlice.reducer //exports all reducers

export const selectTeacher = state => state.teacher.teacher;