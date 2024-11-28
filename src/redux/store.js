import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import eventReducer from './slices/EventSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
    events: eventReducer, 
  },
});

export default store;