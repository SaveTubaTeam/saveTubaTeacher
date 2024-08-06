import { configureStore, combineReducers } from "@reduxjs/toolkit";
import teacherSlice from "./teacherSlice";
import currentClassSlice from "./currentClassSlice";
import { rememberReducer, rememberEnhancer } from 'redux-remember';

// @jac927 07/20/24 | We are using redux-remember because the more popular alternative package to persisted state (redux-persist) is no longer maintained.

// Q: What is persisted state? Why do we need it? 
// A: Persisted state is state that is stored in the browser even after closing the tab, closing the browser, or refreshing.
//    Without a persisted state library like redux-remember, the redux store will completely clear to initialState if any of the above actions are performed, leaving the user with an unpopulated page.

// Q: Is the Firebase Auth object persisted?
// A: Yes. We manually persist the Auth object in firebase.js via localStorage.

//redux-remember setup taken from here: https://github.com/zewish/redux-remember?tab=readme-ov-file#usage---web

//see: https://redux.js.org/api/combinereducers
const reducers = combineReducers({
   teacher: teacherSlice,
   currentClass: currentClassSlice,
});

const rememberedKeys = ['teacher', 'currentClass']; //NOTE: specify slices here to remember by their key!!!
const rememberedReducer = rememberReducer(reducers); //boilerplate

//for configureStore see: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
   reducer: rememberedReducer,

   // redux-remember setup boilerplate
   // regarding enhancers: https://redux.js.org/usage/configuring-your-store#extending-redux-functionality
   enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
      rememberEnhancer(window.localStorage, rememberedKeys) //using localStorage under the hood
   )
})