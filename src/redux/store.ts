import { configureStore } from "@reduxjs/toolkit";
import timeEntriesReducer from './slices/timeEntriesSlice';
import projectsReducer from './slices/projectsSlice';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';


const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
       // @ts-ignore
      return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
    }
  };

const localStorageMiddleware = ({ getState }:any) => {
    return (next:any) => (action:any) => {
      const result = next(action);
      localStorage.setItem('applicationState', JSON.stringify(getState()));
      return result;
    };
  };
  

export let store = configureStore({
    reducer:{
        timeEntries:timeEntriesReducer,
        projects:projectsReducer,
        users:authReducer,
        settings:settingsReducer
    },
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})






export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch