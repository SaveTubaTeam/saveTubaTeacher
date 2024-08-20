import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedClass: null, //the classObject passed into our slice here onClick from ClassCards.jsx
  selectedAssignmentObject: null,
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
    selectAssignment(state, action) {
      const { selectedAssignmentObject } = action.payload;
      state.selectedAssignmentObject = selectedAssignmentObject;
      console.log("dispatched selectAssignment | SELECTEDASSIGNMENT:", selectedAssignmentObject);
    },
    clearClassSlice(state, action) {
      return initialState;
    }
  }
});

export default currentClassSlice.reducer;
export const { selectClass, selectAssignment, clearClassSlice } = currentClassSlice.actions;