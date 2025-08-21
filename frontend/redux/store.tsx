import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Define the Job interface for strong typing
interface Job {
  id: number;
  title: string;
  company: string;
}

// Define action types
const SET_JOBS = 'SET_JOBS';

// Create an action for setting jobs
export const setJobs = createAction<Job[]>(SET_JOBS);

// Define the reducer to handle job state
const jobReducer = createReducer<Job[]>([], (builder) => {
  builder.addCase(setJobs, (state, action) => {
    return action.payload;
  });
});

// Create the Redux store
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
