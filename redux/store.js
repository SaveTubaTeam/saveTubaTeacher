import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./teacherSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//why are we using redux-persist? Please see: https://stackoverflow.com/questions/37195590/how-can-i-persist-redux-state-tree-on-refresh
//boilerplate from: https://github.com/rt2zz/redux-persist?tab=readme-ov-file
//see also: https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
//NOTE: redux-persist might become unstable in the future as the package has not been maintained for a while, even tho the redux docs suggest its use.

//see: https://redux.js.org/api/combinereducers
const reducers = combineReducers({
   teacher: teacherSlice,
});

//using default state reconciler (autoMergeLevel1) --> see: https://github.com/rt2zz/redux-persist?tab=readme-ov-file#state-reconciler
const persistConfig = {
   key: 'root',
   storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducers)

//re: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
   reducer: persistedReducer,

   //see: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})