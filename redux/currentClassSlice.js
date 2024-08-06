import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedClass: null, //the classObject passed into our slice here onClick from ClassCards.jsx
}

//slice boilerplate see: https://redux-toolkit.js.org/tutorials/quick-start
const currentClassSlice = createSlice({
  name: 'currentClass',
  initialState: initialState,
  reducers: {
    selectClass(state, action) {
      const { selectedClass } = action.payload;
      state.selectedClass = selectedClass;
      console.log(`dispatched selectClass | SELECTEDCLASS:`, selectedClass);
    },
  }
});

export default currentClassSlice.reducer;
export const { selectClass } = currentClassSlice.actions;