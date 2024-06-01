import { configureStore } from '@reduxjs/toolkit';
import voletReducer from './features/voletSlice';

export const store = configureStore({
  reducer: {
    volet: voletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
