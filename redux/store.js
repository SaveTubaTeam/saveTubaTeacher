import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./teacherSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//why are we using redux-persist? Please see: https://stackoverflow.com/questions/37195590/how-can-i-persist-redux-state-tree-on-refresh
//boiler plate from: https://github.com/rt2zz/redux-persist?tab=readme-ov-file
//see also: https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit

//see: https://redux.js.org/api/combinereducers
const reducers = combineReducers({
   teacher: teacherSlice,           
});

const persistConfig = {
   key: 'root',
   storage,
 }
 
 const persistedReducer = persistReducer(persistConfig, reducers)

//re: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
   reducer: persistedReducer,
})