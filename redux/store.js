import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./teacherSlice";

//re: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
   reducer: {
      teacher: teacherSlice,
  },
})