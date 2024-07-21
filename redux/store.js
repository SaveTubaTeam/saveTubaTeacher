import { configureStore, combineReducers } from "@reduxjs/toolkit";
import teacherSlice from "./teacherSlice";
import { rememberReducer, rememberEnhancer } from 'redux-remember';

// @jac927 07/20/24 | We are using redux-remember because the more popular alternative package to persisted state (redux-persist) is no longer maintained.

// Q: What is persisted state? Why do we need it? 
// A: Persisted state is state that is stored in the browser even after closing the tab, closing the browser, or refreshing.
//    Without a persisted state library, the redux store will completely clear to initialState if any of the above actions are performed.
//    Unpersisted state leaves the authorized user with an unpopulated page if they navigate directly to the dashboard, for example.

//redux-remember setup taken from here: https://github.com/zewish/redux-remember?tab=readme-ov-file#usage---web

//see: https://redux.js.org/api/combinereducers
const reducers = combineReducers({
   teacher: teacherSlice,
});

const rememberedKeys = ['teacher']; // specify slices to remember by their key
const rememberedReducer = rememberReducer(reducers);

//for configureStore see: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
   reducer: rememberedReducer,

   // redux-remember setup boilerplate
   // regarding enhancers: https://redux.js.org/usage/configuring-your-store#extending-redux-functionality
   enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
      rememberEnhancer(window.localStorage, rememberedKeys) //using localStorage under the hood
   )
})