import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   teacher: {}
}

//slice boilerplate re: https://redux-toolkit.js.org/tutorials/quick-start
const teacherSlice = createSlice({
   name: 'teacher',
   initialState: initialState,
   reducers: {
      signInUser(state, action) {
         const { data } = action.payload;
         state.teacher = data;
         console.log("dispatched signInUser | USER:", data);
      },
      signOutUser(state, action) {
         console.log("signOutUser successfully dispatched to userSlice!")
         return initialState; //reset state
      }
   }
});

export const { signInUser, signOutUser } = teacherSlice.actions;
export default teacherSlice.reducer //exports all reducers